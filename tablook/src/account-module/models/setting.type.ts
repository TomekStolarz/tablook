import { FormControl } from "@angular/forms";
import { FormFieldType } from "./form-field.type"
import { ErrorTemplate } from "./error-template.model";
import { Observable } from "rxjs";
import { RegisterData } from "src/register-module/interfaces/register-data.interface";

export type Setting = {
    type: FormFieldType;
    name: string;
    control: FormControl<unknown>;
    errorTemplateName: ErrorTemplate;
    editing: boolean;
    userProperty?: keyof Omit<RegisterData, "details" | "type"> ;
    additionalSelect?: Setting & {settingData: Observable<SelectData[]>};
}

export type SelectData = {
    value: unknown;
    label: string;
}