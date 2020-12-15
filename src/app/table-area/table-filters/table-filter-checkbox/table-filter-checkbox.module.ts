import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@angular/flex-layout';
import { NgxPopperModule } from 'ngx-popper';
import { TableFilterCheckboxComponent } from './table-filter-checkbox.component';

@NgModule({
  declarations: [TableFilterCheckboxComponent],
  imports: [CommonModule, CoreModule, NgxPopperModule],
  exports: [TableFilterCheckboxComponent],
  entryComponents: [TableFilterCheckboxComponent],
})
export class TableFilterCheckboxModule { }
