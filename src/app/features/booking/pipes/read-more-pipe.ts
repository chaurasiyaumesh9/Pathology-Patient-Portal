import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore',
  standalone: true
})
export class ReadMorePipe implements PipeTransform {

  transform(value: unknown, limit: number = 300, suffix: string = '... More'): string {
    if (typeof value !== 'string') {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.slice(0, limit) + suffix;
  }

}
