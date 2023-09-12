import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewChildren, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorTemplate } from 'src/account-module/models/error-template.model';
import { Setting } from 'src/account-module/models/setting.type';
import { AccountService } from 'src/account-module/services/account.service';
import { RegisterData } from 'src/register-module/interfaces/register-data.interface';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit, OnDestroy{
  @Input()
  setting!: Setting;

  @Input()
  actionVisible = true;

  @Input()
  userId = '';

  @Input()
  form!: FormGroup;

  @Output()
  editingStateChange = new EventEmitter<void>();

  @ViewChild('noEmpty', { static: true })
  requiredErrorTemplate!: TemplateRef<unknown>;

  @ViewChild('phoneErrors', { static: true })
  phoneErrorTemplate!: TemplateRef<unknown>; 

  @ViewChild('passwordErrors', { static: true })
  passwordErrorTemplate!: TemplateRef<unknown>; 

  @ViewChild('passwordRepeatErrors', { static: true })
  passwordRepeatErrorTemplate!: TemplateRef<unknown>; 

  private templateMap!: { [key in ErrorTemplate]: TemplateRef<unknown> };

  protected errorTemplate!: TemplateRef<unknown>;

  private readonly accountService = inject(AccountService);

  private subscriptions: Subscription[] = [];

  private defaultValue = '';

  ngOnInit(): void {
    this.initTemplate();
    this.defaultValue = `${this.setting.control.value}`;
    this.errorTemplate = this.templateMap[this.setting.errorTemplateName];
    this.subscriptions.push(this.accountService.selectAllEvent$.subscribe(() => 
      {
        this.defaultValue = `${this.setting.control.value}`;
        this.disableEdit()
      }
    ))
  }

  initTemplate()
  {
    this.templateMap = {
      'required': this.requiredErrorTemplate,
      'phone': this.phoneErrorTemplate,
      'password': this.passwordErrorTemplate,
      'passwordRepeat': this.passwordRepeatErrorTemplate
    };
  }

  onEditClick()
  {
    if (!this.setting.editing) {
      this.enableEdit();
    } else {
      this.disableEdit();
    }

    this.editingStateChange.emit();
  }

  enableEdit() {
    this.setting.editing = true;
    this.setting.control.enable();
    this.setting.additionalSelect?.control.enable();
  }

  disableEdit() {
    this.setting.editing = false;
    this.setting.control.disable();
    this.setting.additionalSelect?.control.disable();
    this.setting.control.reset();
    this.setting.control.patchValue(this.defaultValue);
    this.setting.additionalSelect?.control.reset();
  }

  onSaveClick() {
    if (this.setting.control.invalid) {
      this.setting.control.markAllAsTouched();
      return;
    }
    const userData: Partial<RegisterData> = {};
    if (this.setting.userProperty) {
      userData[this.setting.userProperty] = `${this.setting.control.value}`;
    }
    this.accountService.updateUser(userData, this.userId);
    this.defaultValue = `${this.setting.control.value}`;
    this.disableEdit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
