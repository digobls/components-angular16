import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, ElementRef, HostListener, ViewChild, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormResetEventBus } from './events/form-group-reset-event';

@Component({
  selector: 'app-input-type',
  templateUrl: 'input-type.component.html',
  styleUrls: ['./input-type.component.scss'],
})

export class InputTypeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formGroup!: FormGroup;
  private subscription!: Subscription;

  // Label
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() showRequiredLabel: boolean = false;
  @Input() labelInfo: string = '';
  @Input() labelIcon: string = 'ri-information-line';
  @Input() linkUrl: string = '';
  @Input() linkTxt: string = '';
  @Input() linkTarget: string = '_blank';
  @Input() isRequired: boolean = false;

  // Input
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() disabled: boolean = false;

  // Icon
  @Input() iconClass: string = '';
  @Input() iconInputClass: string = '';
  @Input() onRight: boolean = true;

  // Invalid message
  @Input() customRequiredMsg: string = '';
  @Input() invalidMsg: string = 'Campo obrigatório!';

  // Checkbox
  checkStartValue = true;
  checkValues: any[] = [];
  @Input() checkItems: any = [];
  @Input() labelCheckbox: string = '';
  @Input() subCheckboxLabel: string = '';
  @Input() labelLink: string = '';
  @Input() labelLinkTarget: string = '_blank';

  // Radio
  @Input() bindValueRadio: any;
  @Input() radioItems: any = [];

  // Radio and Checkbox
  @Input() displayInline = false;
  @Input() useCustomClass = 0;

  // Password
  isPassword = false;

  // Textarea
  @Input() minTextarea: boolean = false;

  // Currency
  @Input() prefix: string = 'R$ ';
  @Input() thousands: string = '.';
  @Input() decimal: string = ',';
  @Input() align: string = 'left';
  @Input() allowNegative: boolean = true;
  @Input() allowZero: boolean = true;
  @Input() suffix: string = '';
  @Input() nullable: boolean = true;

  // Config Select, Dropdown, Dropdown Multiple
  dropdownOpen: boolean = false;
  fromRemove: boolean = false;
  valueDropSelected: any = null;
  valueSearchDrop: string = '';

  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';
  @Input() listDrop: any = [];
  @Input() multiple: boolean = false;
  @Input() loadingData: boolean = false;
  @Input() searchSelect: boolean = true;
  @Input() iconDrop: string = 'ri-arrow-drop-down-line';
  @Input() placeHolderSearchSelect: string = 'Pesquisar';
  @Input() txtSearchEmpty: string = 'Nenhum resultado encontrado'

  // Config input tag
  protected readonly length = length;
  defaultTagFormControl = new FormControl();
  @ViewChild('tagInput') tagInputRef: ElementRef | undefined;
  @Input() listTags: string[] = [];
  @Input() showRemoveTag: boolean = true;

  // Global
  @Input() iconRemove: string = 'ri-close-line';

  constructor(
    private formResetEventBus: FormResetEventBus,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    switch (this.type) {
      case 'password':
        this.isPassword = true;
        break;
      case 'checkbox':
        this.configCheckbox();
        break;
      case 'switch':
        this.checkControl();
        break;
    }

    this.subscribeResetForm();
  }

  ngOnChanges(changes: any): void {
    // Config from select, dropdown, drop multiple
    if (this.type === 'select' && this.control.value && (changes?.listDrop?.currentValue !== changes?.listDrop?.previousValue)) {
      if (this.multiple) {
        this.valueDropSelected = this.control.value;
      } else {
        this.rulesPatchValueDropdown(changes?.listDrop?.currentValue);
      }
    }

    // On change multiple or single item from select
    if (this.type === 'select' && !this.disabled) {
      if (changes?.multiple?.currentValue && typeof changes?.disabled?.previousValue === 'boolean') {
        this.valueDropSelected = [];
      } else if (!changes?.multiple?.currentValue && typeof changes?.disabled?.previousValue === 'boolean') {
        this.valueDropSelected = null;
      }
    }

    // Config from tags
    if (this.type === 'tag' && this.control.value && Array.isArray(this.control.value)) {
      this.listTags = this.control.value;
    }

    // Config from checkbox list
    if (this.type === 'checkbox' && this.control?.value?.length && this.checkItems?.length && this.checkStartValue) {
      this.checkStartValue = false;
      this.configCheckbox();
    }

    // Patch form value
    if ((this.type === 'select' && !this.valueDropSelected) || (this.type === 'tag' && !this.valueDropSelected) || this.type === 'checkbox') {
      if (changes?.formGroup?.currentValue) {
        const subscription = this.formGroup.valueChanges.subscribe(() => {
          switch (this.type) {
            case 'tag':
              this.listTags = changes?.formGroup?.currentValue?.controls[this.id].value || [];
              if (this.listTags?.length) {
                subscription?.unsubscribe();
              }
              break;
            case 'select':
              if (this.multiple) {
                this.valueDropSelected = changes?.formGroup?.currentValue?.controls[this.id]?.value || null;
                if (this.valueDropSelected?.length) {
                  subscription?.unsubscribe();
                }
              } else {
                this.rulesPatchValueDropdown(this.listDrop, subscription);
              }
              break;
            case 'checkbox':
              if (this.checkItems?.length && changes?.formGroup?.currentValue?.controls[this.id]?.value?.length && this.checkStartValue) {
                this.checkStartValue = false;
                this.configCheckbox();
                subscription?.unsubscribe();
              }
              break;
          }
        });
      }
    }

    // Disable
    if (typeof changes?.disabled?.previousValue === 'boolean' && changes?.disabled?.currentValue !== changes?.disabled?.previousValue && ((this.type === 'checkbox' && !this.checkItems?.length) || this.type === 'switch')) {
      this.checkControl();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // On patch values from select, dropdown
  rulesPatchValueDropdown(currentValue: any, subscription?: Subscription) {
    if (currentValue.length) {
      currentValue.forEach((value: any) => {
        if (value === this.control.value || value[this.bindValue] === this.control.value || JSON.stringify(value) === JSON.stringify(this.control.value)) {
          this.valueDropSelected = value;
          subscription?.unsubscribe();
        }
      });
    }
  }

  // On reset form
  subscribeResetForm() {
    this.subscription = this.formResetEventBus.formGroupResetEvent.subscribe(formGroup => {
      if (formGroup === this.formGroup) {
        this.control.reset();

        switch (this.type) {
          case 'select':
            if (this.multiple) {
              this.valueDropSelected = [];
            } else {
              this.valueDropSelected = null;
            }
            break;
          case 'tag':
            this.listTags = [];
            this.defaultTagFormControl = new FormControl();
            break;
          case 'checkbox':
            this.checkItems?.forEach((v: any) => {
              v.value = false;
            });
            break;
        }
      }
    });
  }

  // Get data control
  get control() {
    return this.formGroup!.controls[this.id];
  }

  // Password
  changeType() {
    if (this.isPassword && !this.disabled) {
      if (this.type === 'password') {
        this.type = 'text';
        this.iconInputClass = 'ri-eye-off-line';
      } else {
        this.type = 'password';
        this.iconInputClass = 'ri-eye-line';
      }
    }
  }

  // --------- Start configs checkbox ---------

  // Start values
  configCheckbox() {
    if (this.checkItems) {
      if (this.checkItems.length) {
        this.checkValues = [];
        this.formGroup.addControl(this.id, new FormControl('', []));

        this.control.value?.forEach((value: any) => {
          const valueFind = this.checkItems.find((item: any) => item?.id === value.id || item === value);
          if (valueFind) {
            valueFind.value = true;
            this.checkValues.push(valueFind);
          }
        });

        this.formGroup.patchValue({ [this.id]: Array.from(new Set(this.checkValues)) });
      } else {
        this.checkControl();
      }
    }
  }

  // Enable and disable control
  checkControl() {
    // if (this.disabled) {
    //   this.control.disable();
    //  } else {
    //   this.control.enable();
    //  }
  }

  // On change value
  getEventCheckbox(item: any, index: number) {
    this.checkItems[index].value = !item.value;

    if (item.value === false) {
      if (this.checkValues.includes(item.id)) {
        this.checkValues.splice(this.checkValues.indexOf(item.id), 1);
      }
    } else {
      this.checkValues.push(item);
    }

    this.formGroup.patchValue({ [this.id]: Array.from(new Set(this.checkValues)) });
  }


  // --------- Start configs radio ---------
  changeValueRadioButton(data: any) {
    if (this.bindValueRadio) {
      this.formGroup.get(this.id)?.setValue(data[this.bindValueRadio]);
    } else {
      this.formGroup.get(this.id)?.setValue(data);
    }
  }


  // --------- Start configs dropdown drop multiple ---------

  // Open dropdown
  toggleDropdown() {
    setTimeout(() => {
      if (!this.disabled && !this.fromRemove) {
        this.dropdownOpen = !this.dropdownOpen;

        setTimeout(() => {
          if (this.dropdownOpen) {
            const searchDropInput = document.getElementById('searchDrop');
            if (searchDropInput) {
              searchDropInput.focus();
            }
          }
        }, 100);
      }
    }, 100);
  }

  // On focus button select
  onFocusTouchedDirty() {
    this.control?.markAsTouched();
    this.control?.markAsDirty();
  }

  // Set data value
  selectOption(value: any) {
    if (value !== 'isEmptySearch') {
      if (this.multiple) {
        if (this.valueDropSelected === null || (this.multiple && typeof this.valueDropSelected === 'string')) {
          this.valueDropSelected = [];
        }

        const exists = this.checkValueExists(value);
        if (!exists) {
          this.valueDropSelected.push(value);
          this.formGroup.get(this.id)?.setValue(this.valueDropSelected);
        }
      } else {
        if (this.bindValue) {
          this.formGroup.get(this.id)?.setValue(value[this.bindValue]);
        } else {
          this.formGroup.get(this.id)?.setValue(value);
        }

        this.valueDropSelected = value;
      }

      this.valueSearchDrop = '';
      this.dropdownOpen = false;
    }
  }

  // Check value exist to push on array
  checkValueExists(value: any): boolean {
    if (this.valueDropSelected?.length) {
      return this.valueDropSelected.some((item: any) => {
        return JSON.stringify(item) === JSON.stringify(value);
      });
    } else {
      return false;
    }
  }

  // Remove value selected from multiple
  removeValueMultiple(index: number) {
    this.fromRemove = true;
    this.dropdownOpen = false;
    this.valueDropSelected.splice(index, 1);
    this.formGroup.get(this.id)?.setValue(this.valueDropSelected);

    setTimeout(() => {
      this.fromRemove = false;
    }, 300);
  }

  // Remove all values
  removeDropValue() {
    if (!this.disabled) {
      if (this.multiple) {
        this.valueDropSelected = [];
      } else {
        this.valueDropSelected = null;
      }

      this.formGroup.get(this.id)?.setValue(this.valueDropSelected);
    }
  }

  // Close on click off
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  // --------- Start config input tag ---------

  // On focus tag input
  onFocusTagInput(): void {
    this.tagInputRef?.nativeElement.focus();
  }

  // Add value from input tag
  addValueTag(tag?: string): void {
    if (tag) {
      if (tag[tag?.length - 1] === ',' || tag[tag?.length - 1] === ' ') {
        tag = tag.slice(0, -1);
      }
      if (tag.length > 0 && this.listTags.indexOf(tag) === -1) {
        this.listTags.push(tag);
        this.control.setValue(this.listTags);
      }
    }
  }

  // Remove value from input tag
  removeValueTag(index: number): void {
    this.listTags.splice(index, 1);
    this.control.setValue(this.listTags);
  }

  // On key down
  onKeyDown(event: any, focusout?: string): void {
    const inputValue = this.defaultTagFormControl?.value;
    if (event?.code === 'Tab' || focusout === 'focusout') {
      this.addValueTag(inputValue);
      this.defaultTagFormControl.setValue('');
    }
  }

  // On key up
  onKeyUp(event: KeyboardEvent): void {
    const inputValue = this.defaultTagFormControl?.value;
    if (event.code === 'Backspace' && !inputValue) {
      if (this.control?.value && this.control.value?.length) {
        this.removeValueTag(this.control.value.length - 1);
      }
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addValueTag(inputValue);
        this.defaultTagFormControl.setValue('');
      }
    }
  }
}
