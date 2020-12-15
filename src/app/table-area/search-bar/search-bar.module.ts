import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule],
  exports: [SearchBarComponent],
  entryComponents: [SearchBarComponent],
})
export class SearchBarModule { }
