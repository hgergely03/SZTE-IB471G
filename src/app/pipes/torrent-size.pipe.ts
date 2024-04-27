import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'torrentSize',
  standalone: true
})
export class TorrentSizePipe implements PipeTransform {

  transform(value: number): string {
    return value.toString() + ' GB';
  }

}
