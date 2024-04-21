import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss'],
})

export class DefaultButtonComponent {
  @Input() id: any = '';
  @Input() type: string = 'button';
  @Input() text: string = '';

  @Input() showIcon: boolean = false;
  @Input() iconRight: boolean = false;
  @Input() classIcon: string = '';

  @Output() click = new EventEmitter<void>();

  @Input() disabled = false;
  @Input() loading: boolean = false;

  constructor() {}

  onButtonClick() {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}
