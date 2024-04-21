import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yarrTime',
  standalone: true
})
export class YarrTimePipe implements PipeTransform {
  transform(value: Date): string {
    return value.getFullYear() + '/' + value.getMonth() + '/' + value.getDate() 
            + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds() + '🏴‍☠️';
  }
}
