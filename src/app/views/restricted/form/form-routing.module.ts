import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { JsonFormComponent } from './json-form/json-form.component';

const routes: Routes = [
  {
    path: 'simple',
    component: SimpleFormComponent
  },
  {
    path: 'json',
    component: JsonFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FormRoutingModule { }
