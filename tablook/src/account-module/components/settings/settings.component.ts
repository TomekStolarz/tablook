import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, connectable, first, map } from 'rxjs';
import { SelectData, Setting } from 'src/account-module/models/setting.type';
import { AccountService } from 'src/account-module/services/account.service';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { selectUser } from 'src/app/store/user.selector';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { RegisterData } from 'src/register-module/interfaces/register-data.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  
  private readonly cps = inject(CountryPhoneCodeService);

  private readonly store = inject(Store);

  private readonly cdRef = inject(ChangeDetectorRef);

  private readonly accountService = inject(AccountService);

  user$ = this.store.select(selectUser);

  protected userId!: string;

  protected coutryCodes: Observable<SelectData[]> = this.cps.getCountryCode().pipe(map((codes) => {
    return codes.map((code) => ({value: code.phoneCode, label: code.phoneCode.charAt(0) === '+' ? code.phoneCode : `+${code.phoneCode}`}))
  })
  );

  protected isEditable = false;

  protected email = '';

  protected settingsForm!: FormGroup<{
    name: FormControl<string>;
    surname: FormControl<string>;
    phonePrefix: FormControl<string>;
    phone: FormControl<string>;
    password: FormControl<string>;
    passwordRepeat: FormControl<string>;
  }>; 

  protected settingFields: Setting[] = [];

  protected passwordRepeatField!: Setting;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const userSub = this.user$.subscribe((user) => {
      if (user) {
        this.email = user.email;
        this.userId = user.id;
        const phonePrefix = user.phone.split(/\s/)?.[0].replace('+', '');
        const phone = user.phone.split(/\s/)?.[1] ?? user.phone;
        this.settingsForm = this.fb.nonNullable.group(
          {
            name: [{value: user.name, disabled: true}, Validators.required],
            surname: [{value: user.surname, disabled: true}, Validators.required],
            phonePrefix: [{value: phonePrefix, disabled: true}, Validators.required],
            phone: [{value: phone, disabled: true}, [Validators.required, phoneValidator()]],
            password: [
              {value: '', disabled: true},
              [
                Validators.required,
                Validators.minLength(8),
                passwordValidator(),
              ],
            ],
            passwordRepeat: [''],
          },
          { validators: matchPasswordValidator }
        );
        this.initSettings();
        this.cdRef.detectChanges();
      }
    });
    
    this.subscriptions.push(userSub);
  }

  initSettings() {
    this.settingFields = [
      { type: 'text', name: 'Name', control: this.settingsForm.controls.name, errorTemplateName: 'required', userProperty: 'name', editing: false },
      { type: 'text', name: 'Surname', control: this.settingsForm.controls.surname, errorTemplateName: 'required', userProperty: 'surname', editing: false },
      {
        type: 'text', name: 'Phone', control: this.settingsForm.controls.phone, errorTemplateName: "phone", userProperty: 'phone', editing: false,
        additionalSelect: {
          type: 'select', name: 'Prefix', control: this.settingsForm.controls.phonePrefix, errorTemplateName: 'required', editing: false,
          settingData: this.coutryCodes,
        }
      },
      { type: 'password', name: 'Password', control: this.settingsForm.controls.password, errorTemplateName: "password", editing: false, userProperty: 'password'},
    ];
    this.passwordRepeatField = { type: 'password', name: 'Password repeat', control: this.settingsForm.controls.passwordRepeat, errorTemplateName: "passwordRepeat", editing: false };
  }

  onSaveAll() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }
    this.isEditable = !this.isEditable;

    const userData: Partial<RegisterData> = this.settingFields.filter((setting) => setting.editing).reduce((acc, setting) => {
      if (setting.userProperty) {
        acc[setting.userProperty] = `${setting.control.value}`;
      }
      return acc;
    }, {} as Partial<RegisterData>);

    this.accountService.emitSelectAllEvent();
    this.accountService.updateUser(userData, this.userId);
  }

  checkEditingStates() {
    this.isEditable = this.settingFields.filter((set) => set.editing).length > 1;
  }

  onDeleteAccount()
  {
    this.subscriptions.push(this.accountService.deleteAccount(this.userId));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
