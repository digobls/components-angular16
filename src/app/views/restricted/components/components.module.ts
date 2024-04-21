import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutingModule} from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { DropFileExampleComponent } from './drop-file-example/drop-file-example.component';
import { InputExampleComponent } from './input-example/input-example.component';
import { LoadingButtonExampleComponent } from './loading-button-example/loading-button-example.component';
import { SkeletonLoadingExampleComponent } from './skeleton-loading-example/skeleton-loading-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { EmptyBoxExampleComponent } from './empty-box-example/empty-box-example.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    DropFileExampleComponent,
    InputExampleComponent,
    LoadingButtonExampleComponent,
    SkeletonLoadingExampleComponent,
    TableExampleComponent,
    EmptyBoxExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsRoutingModule,
    SharedModule,
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
