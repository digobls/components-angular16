import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneMask' })
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '-';
    }

    const formattedNumber = value.replace(/\D/g, ''); // Remove non-digits
    const withDDD = formattedNumber.length >= 11 ? formattedNumber.slice(0, 11) : formattedNumber; // Limit to 11 digits for DDD format

    return withDDD.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Add parentheses, space, and hyphen
  }
}
