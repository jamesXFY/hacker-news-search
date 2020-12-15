import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPopperModule } from 'ngx-popper';
import { ButtonsModule } from 'src/app/shared/buttons/buttons.module';
import { TableCardComponent } from './table-card.component';

describe('TableCardComponent', () => {

  const createComponent = createComponentFactory({
    component: TableCardComponent,
    imports: [ButtonsModule, CommonModule, FlexLayoutModule, NgxPopperModule],
  });
  let spectator: Spectator<TableCardComponent>;

  beforeEach(() => spectator = createComponent());

  it('should create the TableCardComponent', () => {
    const tableCardComponent = spectator.component;
    expect(tableCardComponent).toBeTruthy();
  });
});
