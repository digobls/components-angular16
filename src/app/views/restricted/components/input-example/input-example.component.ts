import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-example',
  templateUrl: 'input-example.component.html',
  styleUrls: [`input-example.component.scss`]
})

export class InputExampleComponent implements OnInit, OnDestroy {

  protected readonly JSON = JSON;

  formInput: FormGroup = new FormGroup({
    input: new  FormControl( null),
    type: new  FormControl( 'text'),
    label: new  FormControl( 'Exemplo'),
    placeholder: new  FormControl( 'Exemplo de placeholder'),
    mask: new  FormControl( null),
    disable: new  FormControl( false),
    multiple: new  FormControl( false),
    listCheck: new  FormControl( false),
  });

  listType: string[] = [
    'text',
    'number',
    'date',
    'password',
    'select',
    'tag',
    'currency',
    'textarea',
    'switch',
    'checkbox',
    'radio',
  ];
  listNames: {id: number, name: string}[] = [
    {id: 1, name: 'Ana Silva'},
    {id: 2, name: 'Carlos Oliveira'},
    {id: 3, name: 'Bruna Almeida'},
    {id: 4, name: 'Rodrigo Pereira'},
    {id: 5, name: 'Diego Santos'},
    {id: 6, name: 'Elisa Costa'},
    {id: 7, name: 'Felipe Pereira'},
    {id: 8, name: 'Giovana Souza'},
    {id: 9, name: 'Henrique Lima'}
  ];
  listTypeContact: {id: number, name: string}[] = [
    {id: 1, name: 'E-mail'},
    {id: 2, name: 'Telefone'},
    {id: 3, name: 'Todos'},
  ];

  listDisplay: any = [{id: 1, name: 'block'}, {id: 2, name: 'inline-block'}];
  listCheckbox: any = [];

  subscriptions: any[] = [];
  constructor() { }

  public ngOnInit() {
    this.subscriptions.push(
      this.formInput.get('type')?.valueChanges.subscribe((newType) => {
        this.formInput.get('input')?.setValue(null);
      }),
      this.formInput.get('multiple')?.valueChanges.subscribe((newType) => {
        this.formInput.get('input')?.setValue(null);
      }),
      this.formInput.get('listCheck')?.valueChanges.subscribe((newType) => {
        this.formInput.get('input')?.setValue(null);

        if (newType) {
          this.listCheckbox = this.listTypeContact;
        } else {
          this.listCheckbox = [];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
