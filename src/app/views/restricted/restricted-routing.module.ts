import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictedComponent } from './restricted.component';

const routes: Routes = [
  {
    path: '',
    component: RestrictedComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule)
      },
      {
        path: 'componentes',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: '',
        redirectTo: 'usuario',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RestrictedRoutingModule { }
