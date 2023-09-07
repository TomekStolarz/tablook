import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorTemplate } from 'src/account-module/models/error-template.model';
import { Setting } from 'src/account-module/models/setting.type';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit{
  @Input()
  setting!: Setting;

  @Input()
  actionVisible = true;

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

  ngOnInit(): void {
    this.initTemplate();
    this.errorTemplate = this.templateMap[this.setting.errorTemplateName];
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
    this.setting.editing = !this.setting.editing;
    if (this.setting.editing) {
      this.enableEdit();
    } else {
      this.disableEdit();
    }

    this.editingStateChange.emit();
  }

  enableEdit() {
    this.setting.control.enable();
    this.setting.additionalSelect?.control.enable();
  }

  disableEdit() {
    this.setting.control.disable();
    this.setting.additionalSelect?.control.disable();
    this.setting.control.reset();
    this.setting.additionalSelect?.control.reset();
  }
}
