import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [ButtonsModule, CommonModule, FlexLayoutModule],
  exports: [PaginationComponent],
  entryComponents: [PaginationComponent],

})
export class PaginationModule { }
