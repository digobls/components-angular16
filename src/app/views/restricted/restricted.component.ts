import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-restricted-components',
  templateUrl: 'restricted.component.html'
})
export class RestrictedComponent implements OnInit, OnDestroy {
  menuIsOpen = true;
  constructor() { }

  ngOnInit(): void {

  }

  checkStatusMenu(statusMenu: boolean) {
    this.menuIsOpen = statusMenu;
  }

  ngOnDestroy(): void {
  }
}
