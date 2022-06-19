import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): string {
    const hours  = Math.floor(time / 60);
    const minutes = Math.floor((time - hours * 60));
    return `${hours} h ${minutes} m`
  }

}