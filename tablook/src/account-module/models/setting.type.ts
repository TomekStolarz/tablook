import { FormControl } from "@angular/forms";
import { FormFieldType } from "./form-field.type"
import { ErrorTemplate } from "./error-template.model";

export type Setting = {
    type: FormFieldType;
    name: string;
    control: FormControl<unknown>;
    errorTemplateName: ErrorTemplate;
    editing: boolean;
}