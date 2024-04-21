import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-navbar',
  templateUrl: './default-navbar.component.html',
  styleUrls: ['./default-navbar.component.scss']
})
export class DefaultNavbarComponent {
  @Output() changeTotalRecords = new EventEmitter<number>();

  constructor() {}
}
