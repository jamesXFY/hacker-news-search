import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableAreaComponent } from './table-area.component';
import { TableCardsModule } from './table-cards/table-cards.module';
import { TableCardModule } from './table-cards/table-card/table-card.module';
import { TableFiltersModule } from './table-filters/table-filters.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  declarations: [TableAreaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TableCardsModule,
    TableCardModule,
    PaginationModule,
    TableFiltersModule,
    SearchBarModule
  ],
  exports: [
    TableAreaComponent,
    TableCardsModule,
    TableCardModule,
    PaginationModule,
    TableFiltersModule,
    SearchBarModule
  ],
  entryComponents: [TableAreaComponent],
})
export class TableAreaModule { }
