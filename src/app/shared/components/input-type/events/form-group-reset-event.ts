import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormResetEventBus {
  formGroupResetEvent = new EventEmitter<FormGroup>();

  emitFormReset(formGroup: FormGroup) {
    this.formGroupResetEvent.emit(formGroup);
  }
}
