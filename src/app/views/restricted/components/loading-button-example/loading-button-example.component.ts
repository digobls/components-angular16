import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loading-button-example',
  templateUrl: 'loading-button-example.component.html',
  styleUrls: [`loading-button-example.component.scss`]
})

export class LoadingButtonExampleComponent implements OnInit {
  formLoadingBtn: FormGroup = new FormGroup({
    text: new  FormControl( 'Salvar'),
    iconRight: new  FormControl( false),
    margin: new  FormControl( '10px 20px 0 0'),
    viewIcon: new  FormControl( true),
    disable: new  FormControl( false),
    loading: new  FormControl( false),
  });

  constructor() { }

  public ngOnInit() {  }

  sendValue() {
    if (!this.formLoadingBtn.get('loading')?.value) {
      this.formLoadingBtn.get('loading')?.setValue(true);
      setTimeout( () => {
        this.formLoadingBtn.get('loading')?.setValue(false);
      }, 2000);
    }
  }
}
