import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCardsComponent } from './table-cards.component';
import { TableCardModule } from './table-card/table-card.module';

@NgModule({
  declarations: [TableCardsComponent],
  imports: [CommonModule, TableCardModule],
  exports: [TableCardsComponent],
  entryComponents: [TableCardsComponent],
})
export class TableCardsModule {}
