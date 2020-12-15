import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterCheckboxListComponent } from './table-filter-checkbox-list.component';
import { TableFilterCheckboxModule } from '../table-filter-checkbox/table-filter-checkbox.module';

@NgModule({
  declarations: [TableFilterCheckboxListComponent],
  imports: [CommonModule, TableFilterCheckboxModule],
  exports: [TableFilterCheckboxListComponent],
  entryComponents: [TableFilterCheckboxListComponent],
})
export class TableFilterCheckboxListModule { }
