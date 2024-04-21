import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'documentMask' })
export class DocumentMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '-';
    }

    const formattedValue = value.replace(/\D/g, ''); // Remove non-digits
    const isCPF = formattedValue.length <= 11; // Check for CPF length

    return isCPF
      ? formattedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') // CPF format
      : formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // CNPJ format
  }
}
