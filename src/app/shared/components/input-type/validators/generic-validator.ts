import { AbstractControl } from '@angular/forms';

export class GenericValidator {
  constructor() { }

  static CPFCNPJ(control: AbstractControl) {
    if (!control.value)
      return null;

    const cpf_cnpj = (control.value || '').replace(/\./gi, '').replace('/', '').replace('-', '');

    let digit_1 = 0;
    let digit_2 = 0;
    let valid = false;

    if (new RegExp('[0-9]{14}').test(cpf_cnpj)) {
      if (
        cpf_cnpj != '00000000000000' &&
        cpf_cnpj != '11111111111111' &&
        cpf_cnpj != '22222222222222' &&
        cpf_cnpj != '33333333333333' &&
        cpf_cnpj != '44444444444444' &&
        cpf_cnpj != '55555555555555' &&
        cpf_cnpj != '66666666666666' &&
        cpf_cnpj != '77777777777777' &&
        cpf_cnpj != '88888888888888' &&
        cpf_cnpj != '99999999999999'
      ) {
        let sum = 0;
        let size = cpf_cnpj.length - 2;
        let pos = size - 7;
        let digits = cpf_cnpj.substring(size);
        let numbers = cpf_cnpj.substring(0, size);

        for (let i = size; i >= 1; i--) {
          sum += numbers.charAt(size - i) * pos--;
          if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0), 10)) {
          valid = false;
        } else {
          sum = 0;
          size += 1;
          pos = size - 7;
          numbers = cpf_cnpj.substring(0, size);

          for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) pos = 9;
          }

          result = sum % 11 < 2 ? 0 : 11 - sum % 11;
          valid = (result === parseInt(digits.charAt(1), 10));
        }
      }
    } else if (new RegExp('[0-9]{11}').test(cpf_cnpj)) {
      if (
        cpf_cnpj != '00000000000' &&
        cpf_cnpj != '11111111111' &&
        cpf_cnpj != '22222222222' &&
        cpf_cnpj != '33333333333' &&
        cpf_cnpj != '44444444444' &&
        cpf_cnpj != '55555555555' &&
        cpf_cnpj != '66666666666' &&
        cpf_cnpj != '77777777777' &&
        cpf_cnpj != '88888888888' &&
        cpf_cnpj != '99999999999'
      ) {
        for (let i = 0; i < 10; i++) {
          digit_1 = i < 9 ? (digit_1 + (parseInt(cpf_cnpj[i]) * (11 - i - 1))) % 11 : digit_1;
          digit_2 = (digit_2 + (parseInt(cpf_cnpj[i]) * (11 - i))) % 11;
        }

        valid = ((parseInt(cpf_cnpj[9]) == (digit_1 > 1 ? 11 - digit_1 : 0)) &&
          (parseInt(cpf_cnpj[10]) == (digit_2 > 1 ? 11 - digit_2 : 0)))
      }
    }

    if (valid) return null;
    return { invalidDocument: true };
  }

  static FULLNAME(control: AbstractControl) {
    if (!control.value)
      return null;

    const regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    if (regex.test(control.value.trim())) {
      return null;
    } else {
      return { invalidFullName: true };
    }
  }
}
