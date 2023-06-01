import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToTime'
})
export class DateToTimePipe implements PipeTransform {

  transform(date: Date): string {
    return new Date(date).toISOString().split('T')[1]?.split(':').slice(0, 2).join(':');
  }

}
