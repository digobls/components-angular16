import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultAlertModalComponent } from '../shared/components/default-alert-modal/default-alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalAlertService {
  constructor(private modalService: NgbModal) { }

  openModal(title: string, content: string, data?: any, size?: string): Promise<any> {
    const modalRef = this.modalService.open(DefaultAlertModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.description = content;
    modalRef.componentInstance.data = data || null;

    return modalRef.result;
  }
}
