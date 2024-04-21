import { Component, EventEmitter, Output } from '@angular/core';
import { ModalAlertService } from '../../../service/default-alert-modal.service';

@Component({
  selector: 'app-default-sidebar',
  templateUrl: './default-sidebar.component.html',
  styleUrls: ['./default-sidebar.component.scss']
})
export class DefaultSidebarComponent {
  @Output() statusMenu = new EventEmitter<boolean>();
  isExpanded = true;
  showMenu = false;

  constructor(
    private modalAlertService: ModalAlertService
  ) {}

  openAndCloseMenu() {
    this.isExpanded = !this.isExpanded;
    this.showMenu = false;
    this.statusMenu.emit(this.isExpanded);
  }

  expand() {
    this.showMenu = true;
  }

  collapse() {
    this.showMenu = false;
  }

  showAlert() {
    const data = {
      showWarningIcon: true,
      showCancelBtn: true,
      showConfirmBtn: true
    };

    this.modalAlertService.openModal('Aviso', 'Página em desenvolvimento.', data, 'md');
  }
}
