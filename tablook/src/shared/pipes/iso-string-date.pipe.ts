import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoStringDate'
})
export class IsoStringDatePipe implements PipeTransform {

  transform(value: Date): string {
    return value.toString().split('T')[0];
  }

}
