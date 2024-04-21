import { Component, OnInit } from '@angular/core';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empty-box-example',
  templateUrl: 'empty-box-example.component.html',
  styleUrls: [`empty-box-example.component.scss`]
})

export class EmptyBoxExampleComponent implements OnInit {
  formEmpty: FormGroup = new FormGroup({
    title: new  FormControl( 'Você ainda não possui nenhum usuário cadastrado'),
    description: new  FormControl( 'Dê o primeiro passo para aproveitar ao máximo nossos recursos! Crie sua conta agora e tenha acesso exclusivo a uma variedade de funcionalidades personalizadas. É simples, rápido e gratuito. Não perca tempo, junte-se a nós e descubra um mundo de possibilidades!'),
    descriptionHtml: new  FormControl( null),
    descriptionContinue: new  FormControl( null),
    textLink: new  FormControl( ''),
    link: new  FormControl( ''),
    textBtn: new  FormControl( 'Cadastrar usuário')
  });

  constructor(
    private modalAlertService: ModalAlertService
  ) { }

  public ngOnInit() {}

  // On action click
  onAction(data: any) {
    console.log('data', data);

    this.modalAlertService.openModal(
      'Ação',
      'Click novo usuario',
      { showSuccessIcon: true, showConfirmBtn: true },
      'md'
    );
  }
}
