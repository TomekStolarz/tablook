import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Setting } from 'src/account-module/models/setting.type';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { WatchRepeatPasswordErrorStrategy } from 'src/register-module/directives/watch-form-error-strategy';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly fb = inject(FormBuilder);
  
  private readonly cps = inject(CountryPhoneCodeService);

  protected coutryCodes = this.cps.getCountryCode();

  protected isEditable = false;

  protected settingsForm = this.fb.nonNullable.group(
		{
			name: ['', Validators.required],
			surname: ['', Validators.required],
			phonePrefix: ['', Validators.required],
			phone: ['', [Validators.required, phoneValidator()]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					passwordValidator(),
				],
			],
			passwordRepeat: ['', [Validators.required]],
		},
		{ validators: matchPasswordValidator }
	);


  protected settingFields: Setting[] = [
    { type: 'text', name: 'Name', control: this.settingsForm.controls.name, errorTemplateName: 'required', editing: false },
    { type: 'text', name: 'Surname', control: this.settingsForm.controls.surname, errorTemplateName: 'required', editing: false },
    { type: 'text', name: 'Prefix', control: this.settingsForm.controls.phonePrefix, errorTemplateName: 'required', editing: false },
    { type: 'text', name: 'Phone', control: this.settingsForm.controls.phone, errorTemplateName: "phone", editing: false },
    { type: 'password', name: 'Password', control: this.settingsForm.controls.password, errorTemplateName: "password", editing: false },
  ];

  protected passwordRepeatField: Setting = { type: 'password', name: 'Password repeat', control: this.settingsForm.controls.passwordRepeat, errorTemplateName: "passwordRepeat", editing: false };
  
  onSaveAll() {
    this.isEditable = !this.isEditable;
    this.settingsForm.reset();
  }

  checkEditingStates() {
    this.isEditable = this.settingFields.filter((set) => set.editing).length > 1;
  }
}
