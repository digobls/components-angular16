import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readJson' })
export class ReadJsonPipe implements PipeTransform {
  transform(value: any, key: string): string {
    try {
      if (!value || !key) {
        return '-';
      } else if (value[key]) {
        return value[key];
      } else {
        return '-';
      }
    } catch (e) {
      return '-';
    }
  }
}
