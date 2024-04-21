import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { JsonFormComponent } from './json-form/json-form.component';

@NgModule({
  declarations: [
    SimpleFormComponent,
    JsonFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormRoutingModule,
    SharedModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FormModule { }
