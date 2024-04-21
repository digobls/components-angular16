import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-default-alert-modal',
  templateUrl: './default-alert-modal.component.html',
  styleUrls: ['./default-alert-modal.component.scss']
})
export class DefaultAlertModalComponent implements OnInit {
  @Input() title: any;
  @Input() description: any;
  @Input() data: any;

  descriptionIsString = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.descriptionIsString = typeof this.description === 'string';
  }

  confirmContinue() {
    this.activeModal.close({continueAction: true});
  }

  closeModal(): void {
    this.activeModal.close({close: true});
  }
}
