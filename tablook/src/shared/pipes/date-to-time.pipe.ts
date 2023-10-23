import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToTime'
})
export class DateToTimePipe implements PipeTransform {

  transform(date: Date): string {
    if (typeof date !== 'string') {
      return `${date}`;
    }
    const properDate = new Date(date);
    const minutes = properDate.getMinutes();
    return `${properDate.getHours()}:${minutes < 10 ? `0${minutes}`: minutes}`;
  }

}
