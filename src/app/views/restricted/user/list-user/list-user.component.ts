import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';
import { TableHeader } from '../../../../shared/components/default-simple-table/table-header.interface';

@Component({
  selector: 'app-list-user-components',
  templateUrl: 'list-user.component.html',
  styleUrls: [`list-user.component.scss`]
})

export class ListUserComponent implements OnInit {
  listHeaderTable: TableHeader[] = [];
  listUsers: any = [];
  copyUsers: any = [];

  loadingList = false;
  loadingDelete = false;

  dataPagination = {
    currentPage: 1,
    totalRecords: 0,
    totalRecordsPerPage: 0
  };

  constructor(
    private userService: UserService,
    private modalAlertService: ModalAlertService,
  ) { }

  public ngOnInit() {
    this.loadUsers();

    this.listHeaderTable = [
      { key: 'fullName', label: 'Usuário', sortable: false },
      { key: 'email', label: 'E-mail', sortable: false },
      { key: 'documentNumber', label: 'Documento', sortable: false, usePipe: true, isDocument: true },
      { key: 'dateBirthday', label: 'Data de aniversário', sortable: false, usePipe: true, isDate: true },
      { key: 'actions', label: 'Ações', sortable: false,
        actions: [
          {type: 'edit', label: 'Editar', link: '/usuario/editar', pathname: ['id']},
          {type: 'delete', label: 'Excluir'},
        ]
      }
    ];
  }

  // Load list from users
  loadUsers() {
    this.loadingList = true;
    this.userService.listUsers().subscribe({
      next: (response) => {
        this.listUsers = response.slice(0, 5);
        this.copyUsers = response;

        this.dataPagination.totalRecords = 10;
        this.dataPagination.totalRecordsPerPage = 10;

        this.loadingList = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingList = false;
      }
    });
  }

  // On table action
  onAction(data: any) {
    switch (data.action.type) {
      case 'delete':
          this.checkRemove(data?.row);
        break
    }
  }

  // Check remove
  checkRemove(data: any) {
      const dataConfig = {
        showDangerIcon: true,
        showCancelBtn: true,
        showConfirmBtn: true,
        customTxtCancel: 'Cancelar'
      };

    this.modalAlertService.openModal(
      'Aviso',
      'Tem certeza que deseja excluir o usuário?',
      dataConfig,
      'md').then((result) => {
      if (result?.continueAction) {
        this.removeUser(data);
      }
    });
  }

  // Remove product
  removeUser(data: any) {
      this.loadingDelete = true;
      this.userService.deleteUser(data.id).subscribe({
        next: (response) => {
          this.loadUsers()
        },
        error: (error) => {
          console.error(error);
          this.loadingList = false;
        }
      });
  }

  onChangePage(data: any) {
    this.listUsers = this.randomArray(this.copyUsers).slice(0, this.dataPagination.totalRecordsPerPage);
  }

  // Random array
  randomArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
