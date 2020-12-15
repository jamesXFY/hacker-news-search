import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersComponent } from './table-filters.component';
import { TableFilterCheckboxListModule } from './table-filter-checkbox-list/table-filter-checkbox.module';
import { TableFilterDropDownCheckboxModule } from './table-filter-dropdown-checkbox/table-filter-dropdown-checkbox.module';

@NgModule({
  declarations: [TableFiltersComponent],
  imports: [CommonModule, TableFilterCheckboxListModule, TableFilterDropDownCheckboxModule],
  exports: [TableFiltersComponent],
  entryComponents: [TableFiltersComponent],
})
export class TableFiltersModule { }
