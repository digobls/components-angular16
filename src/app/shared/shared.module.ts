import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultSimpleTableComponent } from './components/default-simple-table/default-simple-table.component';
import { DefaultNavbarComponent } from './components/default-navbar/default-navbar.component';
import { DefaultSidebarComponent } from './components/default-sidebar/default-sidebar.component';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { InputTypeComponent } from './components/input-type/input-type.component';
import { DefaultAlertModalComponent } from './components/default-alert-modal/default-alert-modal.component';
import { SearchDropDownPipe } from './components/input-type/pipes/search-drop-down.pipe';
import { EventUploadDirective } from './components/default-drop-file/event-upload.directive';
import { DefaultDropFileComponent } from './components/default-drop-file/default-drop-file.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { DocumentMaskPipe } from './components/default-simple-table/pipes/document-mask.pipe';
import { PhoneMaskPipe } from './components/default-simple-table/pipes/phone-mask.pipe';
import { ReadJsonPipe } from './components/default-simple-table/pipes/read-json.pipe';
import { DefaultEmptyBoxComponent } from './components/default-empty-box/default-empty-box.component';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';

@NgModule({
  declarations: [
    SearchDropDownPipe,
    DocumentMaskPipe,
    PhoneMaskPipe,
    ReadJsonPipe,
    DefaultSidebarComponent,
    DefaultNavbarComponent,
    DefaultSimpleTableComponent,
    DefaultButtonComponent,
    InputTypeComponent,
    DefaultAlertModalComponent,
    DefaultDropFileComponent,
    EventUploadDirective,
    SkeletonLoadingComponent,
    DefaultEmptyBoxComponent
  ],
  exports: [
    SearchDropDownPipe,
    DocumentMaskPipe,
    PhoneMaskPipe,
    ReadJsonPipe,
    DefaultSidebarComponent,
    DefaultNavbarComponent,
    DefaultSimpleTableComponent,
    DefaultButtonComponent,
    InputTypeComponent,
    DefaultAlertModalComponent,
    DefaultDropFileComponent,
    SkeletonLoadingComponent,
    DefaultEmptyBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyDirective
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {

}
