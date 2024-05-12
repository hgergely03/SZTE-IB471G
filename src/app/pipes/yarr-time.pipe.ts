import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yarrTime',
  standalone: true
})
export class YarrTimePipe implements PipeTransform {
  transform(value: any): string {
    const date = value.toDate();
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() 
            + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '🏴‍☠️';
  }
}
