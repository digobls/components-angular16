import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-empty-box',
  templateUrl: './default-empty-box.component.html',
  styleUrls: ['./default-empty-box.component.scss'],
})

export class DefaultEmptyBoxComponent {
  @Input() loadingData: boolean = false;
  @Input() removeShadow: boolean = true;

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() descriptionHtml: string = '';
  @Input() descriptionContinue: string = '';

  @Input() textLink: string = '';
  @Input() link: string = '';
  @Input() data: string = '';
  @Input() textBtn: string = '';

  @Output() sendDataAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  sendAction() {
    this.sendDataAction.emit({type: 'empty-button', data: this.data});
  }
}
