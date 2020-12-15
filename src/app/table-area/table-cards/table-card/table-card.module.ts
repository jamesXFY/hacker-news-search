import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPopperModule } from 'ngx-popper';
import { ButtonsModule } from '../../../shared/buttons/buttons.module';
import { TableCardComponent } from './table-card.component';

@NgModule({
  declarations: [TableCardComponent],
  imports: [ButtonsModule, CommonModule, FlexLayoutModule, NgxPopperModule],
  exports: [TableCardComponent],
  entryComponents: [TableCardComponent],

})
export class TableCardModule { }
