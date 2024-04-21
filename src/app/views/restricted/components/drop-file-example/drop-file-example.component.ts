import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';

@Component({
  selector: 'app-drop-file-example',
  templateUrl: 'drop-file-example.component.html',
  styleUrls: [`drop-file-example.component.scss`]
})

export class DropFileExampleComponent implements OnInit {
  // Drop file
  listType: any = [{id: 1, name: 'base64'}, {id: 2, name: 'file'}];
  resultFile: any;
  formDropFile: FormGroup = new FormGroup({
    showLabel: new  FormControl( true),
    showFiles: new  FormControl( true),
    singleFile: new  FormControl( false),
    showIcon: new  FormControl( true),
    directUpload: new  FormControl( null),
    type: new  FormControl( {id: 1, name: 'base64'}),
    text: new  FormControl( 'Adicionar documento'),
    label: new  FormControl( 'Anexo'),
    acceptedExtensions: new  FormControl( 'jpg,jpeg,png,svg+xml,pdf,docx,doc,msword,xlsx,xls'),
  });

  constructor(
    private modalAlertService: ModalAlertService,
  ) { }

  public ngOnInit() { }

  // Drop file
  resultFiles(data: any) {
    this.resultFile = data;
    console.log('this.resultFile', this.resultFile);
  }

  showMessage(data: any) {
    let message = ''
    if (data?.message) {
      switch (data.message) {
        case 'Select just one file to continue.':
          message = 'Selecione apenas um arquivo para continuar.';
          break;
        case 'Invalid file type.':
          message = 'Tipo do arquivo inválido.';
          break;
        case 'Start upload files.':
          message = 'Configurar o service de upload.';
          break;
      }
    }

    this.modalAlertService.openModal(
      'Aviso',
      message,
      { showWarningIcon: true, showConfirmBtn: true },
      'md'
    );
  }
}
