import { Component, OnInit } from '@angular/core';
import { TableHeader } from '../../../../shared/components/default-simple-table/table-header.interface';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';

@Component({
  selector: 'app-table-example',
  templateUrl: 'table-example.component.html',
  styleUrls: [`table-example.component.scss`]
})

export class TableExampleComponent implements OnInit {
  listHeaderTable: TableHeader[] = [];
  listData: any = [];
  dataPagination = {
    currentPage: 1,
    totalRecordsPerPage: 20,
    totalRecords: 220
  };

  constructor(
    private modalAlertService: ModalAlertService
  ) { }

  public ngOnInit() {
    this.listHeaderTable = [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'phone', label: 'Telefone', sortable: false, usePipe: true, isPhone: true },
      { key: 'email', label: 'E-mail', sortable: true },
      { key: 'documentNumber', label: 'Documento', sortable: false, usePipe: true, isDocument: true },
      { key: 'dateBirthday', label: 'Data de aniversário', sortable: false, usePipe: true, isDate: true },
      { key: 'remuneration', label: 'Remuneração', sortable: false, usePipe: true, isCurrency: true },
      { key: 'gender', label: 'Sexo', sortable: false, usePipe: true, isJson: true, jsonKey: 'name' },
      { key: 'tags', label: 'Tags', sortable: false },
      { key: 'actions', label: 'Ações', sortable: false,
        actions: [
          {type: 'view', label: 'Visualizar', link: '/usuario/editar', pathname: ['id'], params: ['id', 'name'], demo: true},
          {type: 'edit', label: 'Editar', link: '/usuario/editar', pathname: ['id'], params: ['id'], demo: true},
          {type: 'delete', label: 'Excluir'},
          {icon: 'ri-file-pdf-2-line', label: 'Custom', externalLink: 'https://google.com.br', target: '_blank', demo: true}
        ]
      }
    ];

    this.mockDataUser();
  }

  mockDataUser() {
    this.listData.push({
      id: '2878',
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 6,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 7,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 8,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 9,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 10,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
    this.listData.push({
      id: 11,
      name: 'Rodrigo Pereira',
      phone: '41999940776',
      email: 'digo.bls@hotmail.com',
      documentNumber: '05226923970',
      dateBirthday: '1991-07-22',
      remuneration: 14000,
      gender: {
        'id': 2,
        'name': "Feminino"
      },
      tags: ["Angular", "Javascript", "CSS", "HTML"]
    })
  }

  // On change list sort
  onListSort(data: any) {
    console.log('data', data);
    this.modalAlertService.openModal(
      'Ordenação por',
      `Ordem: ${data.order}, Chave: ${data.key}`,
      { showSuccessIcon: true, showConfirmBtn: true },
      'md'
    );
  }

  // On action click
  onAction(data: any) {
    const link = this.createLink(data.action, data.row);
    const params = this.createParams(data.action, data.row);

    let message = `Click: ${data?.action?.label}`;

    if (link) {
      message += `Link: ${link}`;
    }

    if (params) {
      message += `Params: ${params?.toString()}`;
    }

    this.modalAlertService.openModal(
      'Ação',
      message,
      { showSuccessIcon: true, showConfirmBtn: true },
      'md'
    );
  }

  // On change page
  onChangePage(dataPage: any) {
    this.dataPagination.currentPage = dataPage.currentPage

    this.modalAlertService.openModal(
      'Ação',
      `Página atual: ${dataPage.currentPage}, items por página ${dataPage.totalRecordsPerPage}`,
      { showSuccessIcon: true, showConfirmBtn: true },
      'md'
    );
  }

  // Create link path
  createLink(data: any, dataRow: any) {
    let dataLink = data.link;

    data?.pathname?.forEach((value: any) => {
      dataLink += `/${this.fixDataLink(dataRow[value])}`;
    });

    return dataLink;
  }

  // Create queryParams
  createParams(data: any, dataRow: any) {
    let dataParams: string = '';
    data?.params?.forEach((value: any, index: number) => {
      if (index) {
        dataParams += `&${value}=${this.fixDataLink(dataRow[value])}`;
      } else {
        dataParams += `?${value}=${this.fixDataLink(dataRow[value])}`;
      }
    });

    return dataParams ;
  }

  // Fix string
  fixDataLink(data: any): string {
    try {
      if (data !== undefined && data !== null) {
        return encodeURIComponent(data?.toString()?.trim()?.toLowerCase().replace(/\s+/g, ''));
      } else {
        return '';
      }
    } catch (e) {
      return '';
    }
  }
}
