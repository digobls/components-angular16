import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '../../../../service/helpers.service';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss']
})
export class JsonFormComponent implements OnInit {
  @Input() userId: any;
  userData: any;

  formUser = new FormGroup({
    firstName: new  FormControl( null, [Validators.required]),
    lastName: new  FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    roles: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    contactType: new FormControl(null, [Validators.required])
  });

  listRoles: any = [];
  listLanguages: any = [];
  listTypeContact: any = [];

  loadingData = false;
  loadingRoles = false;
  loadingLanguages = false;
  loadingSend = false;

  constructor(
      private helpersService: HelpersService,
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadLanguages();
  }

  // Check continue
  checkChange() {
    if (this.formUser.valid && !this.loadingSend) {
      this.loadingSend = true;
    }
  }

  // List languages
  loadLanguages() {
    this.loadingLanguages = true;
    this.helpersService.listLanguages().subscribe({
      next: (response) => {
        this.listLanguages = response;
        this.loadingLanguages = false;
      },
      error: (error) => {
        this.loadingLanguages = false;
      }
    });
  }

  // List roles
  loadRoles() {
    this.loadingRoles = true;
    this.helpersService.listRoles().subscribe({
      next: (response) => {
        this.listRoles = response;
        this.loadingRoles = false;
      },
      error: (error) => {
        this.loadingRoles = false;
      }
    });
  }

}
