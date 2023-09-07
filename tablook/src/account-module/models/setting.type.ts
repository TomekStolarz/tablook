import { FormControl } from "@angular/forms";
import { FormFieldType } from "./form-field.type"
import { ErrorTemplate } from "./error-template.model";
import { Observable } from "rxjs";

export type Setting = {
    type: FormFieldType;
    name: string;
    control: FormControl<unknown>;
    errorTemplateName: ErrorTemplate;
    editing: boolean;
    additionalSelect?: Setting & {settingData: Observable<SelectData[]>};
}

export type SelectData = {
    value: unknown;
    label: string;
}