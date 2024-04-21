import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RestrictedRoutingModule } from './restricted-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RestrictedComponent } from './restricted.component';

@NgModule({
  declarations: [
    RestrictedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RestrictedRoutingModule,
    SharedModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RestrictedModule { }
