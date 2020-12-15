import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterDropdownCheckboxComponent } from './table-filter-dropdown-checkbox.component';
import { TableFilterCheckboxListModule } from '../table-filter-checkbox-list/table-filter-checkbox.module';

@NgModule({
  declarations: [TableFilterDropdownCheckboxComponent],
  imports: [CommonModule, TableFilterCheckboxListModule],
  exports: [TableFilterDropdownCheckboxComponent],
  entryComponents: [TableFilterDropdownCheckboxComponent],
})
export class TableFilterDropDownCheckboxModule { }
