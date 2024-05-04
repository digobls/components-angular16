import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '../../../../service/helpers.service';
import { GenericValidator } from '../../../../shared/components/input-type/validators/generic-validator';
import { FormResetEventBus } from '../../../../shared/components/input-type/events/form-group-reset-event';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {
  isDisable = false;

  formUser: FormGroup = new FormGroup({
    name: new  FormControl( null, [Validators.required, Validators.min(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    documentNumber: new FormControl(null, [Validators.required, GenericValidator.CPFCNPJ]),
    date: new FormControl(null, [Validators.required]),
    dateMask: new FormControl(null, [Validators.required]),
    password1: new FormControl(null, [Validators.required]),
    password2: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    options: new FormControl(null, [Validators.required]),
    roles: new FormControl(null, [Validators.required]),
    tags: new FormControl(null, [Validators.required]),
    money: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    switch: new FormControl(null, [Validators.required]),
    checkbox: new FormControl(null, [Validators.required]),
    checkboxList: new FormControl(null, [Validators.required]),
    radio: new FormControl(null, [Validators.required]),
    radioList: new FormControl(null, [Validators.required]),
  });

  listRoles: any = [];
  listLanguages: any = [];
  listNames: string[] = [
    'Ana Silva',
    'Carlos Oliveira',
    'Bruna Almeida',
    'Rodrigo Pereira',
    'Diego Santos',
    'Elisa Costa',
    'Felipe Pereira',
    'Giovana Souza',
    'Henrique Lima'
  ];
  listTypeContact: {id: number, name: string}[] = [
    {id: 1, name: 'E-mail'},
    {id: 2, name: 'Telefone'},
    {id: 3, name: 'Todos'},
  ];

  loadingName: boolean = false;
  loadingRoles: boolean = false;
  loadingLanguages: boolean = false;

  constructor(
    private formResetEventBus: FormResetEventBus,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadLanguages();
  }

  // Set data form
  setDataForm() {
    // Data form
    const objectValues = {
      name: 'Rodrigo Pereira',
      email: 'digo.bls@hotmail.com',
      phone: '41999940776',
      documentNumber: '60686622090',
      date: "1991-04-10",
      dateMask: '22/07/1991',
      password1: 'rodrigo1',
      password2: 'rodrigo2',
      language: 'c4c7',
      options: 'Rodrigo Pereira',
      roles: [{id: '2', name: 'Analista'}, {id: '4', name: 'Cordenador'}],
      tags: ['dsada', 'qqqq'],
      money: '1500',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      switch: true,
      checkbox: true,
      checkboxList: [{id: 1, name: 'E-mail', value: true}, {id: 2, name: 'Telefone', value: true}],
      radio: {id: 2, name: 'Telefone'},
      radioList: {id: 1, name: 'E-mail'}
    };

    // @ts-ignore
    this.formUser.patchValue(objectValues);
  }

  // Check form
  checkForm() {
    if (this.formUser.valid) {
      console.log('Valor do formulário ->', this.formUser.value);
      alert('Formulário valido.');
    } else {
      this.markAllControlsAsTouchedAndDirty(this.formUser);
    }
  }

  disableForm() {
    this.isDisable = !this.isDisable;
  }

  // Reset form
  resetForm() {
    this.formResetEventBus.emitFormReset(this.formUser);
  }

  // Force formGroup set touched and dirty
  markAllControlsAsTouchedAndDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.markAllControlsAsTouchedAndDirty(control);
      }
    });
  }

  // List languages
  loadLanguages() {
    this.loadingLanguages = true;
    this.helpersService.listLanguages().subscribe({
      next: (response) => {
        this.listLanguages = response;
        this.loadingLanguages = false;
      },
      error: () => {
        this.loadingLanguages = false;
      }
    });
  }

  // List roles
  loadRoles() {
    this.loadingRoles = true;
    this.helpersService.listRoles().subscribe({
      next: (response) => {
        this.listRoles = response;
        this.loadingRoles = false;
      },
      error: () => {
        this.loadingRoles = false;
      }
    });
  }
}
