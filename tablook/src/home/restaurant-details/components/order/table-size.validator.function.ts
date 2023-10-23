import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { RestaurantInfo } from "src/app/interfaces/restaurant-info.interface";
import { Table } from "src/shared/interfaces/table.interface";

export function tableSizeValidator(tables: Table[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        let table;
        const tableId = group.get('tableId');
        const size = group.get('size')?.value;
        if (tableId) {
            table = tables.find((tab) => tab.id === tableId.value)
        }
        if (!table) {
            return null;
        }
        const notEnaughSeats = table.seats < size;
        if (notEnaughSeats) {
            tableId?.setErrors({notEnaughSeats: true})
        } else {
            tableId?.setErrors(null)
        }
        return notEnaughSeats ? { notEnaughSeats: { value: size } } : null;
    }
}