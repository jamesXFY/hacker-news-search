import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonsModule { }
