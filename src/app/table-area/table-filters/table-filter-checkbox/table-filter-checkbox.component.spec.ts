import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@angular/flex-layout';
import { NgxPopperModule } from 'ngx-popper';
import { TableFilterCheckboxComponent } from './table-filter-checkbox.component';

describe('TableFilterCheckboxComponent', () => {

  const createComponent = createComponentFactory({
    component: TableFilterCheckboxComponent,
    imports: [CommonModule, CoreModule, NgxPopperModule],
  });
  let spectator: Spectator<TableFilterCheckboxComponent>;

  beforeEach(() => spectator = createComponent({
    props: {
      checkboxType: 'single-select',
      displayText: 'radio display text',
      selected: false,
      name: 'name',
    }
  }));

  it('should create the TableFilterCheckboxComponent', () => {
    const tableFilterCheckboxComponent = spectator.component;
    expect(tableFilterCheckboxComponent).toBeTruthy();
  });

  it('input type should be radio', () => {
    expect(spectator.component.inputType).toBe('radio');
  });

  it('input type should be checkbox', () => {
    spectator.setInput('checkboxType', 'multi-select')
    expect(spectator.component.inputType).toBe('checkbox');
  });

  it('input type should be checkbox', () => {
    spectator.setInput('checkboxType', 'other')
    expect(spectator.component.inputType).toBe('');
  });

  it('should emit correct checkbox value when click', () => {
    let isSelected = false;
    spectator.output('valueChange').subscribe(result => isSelected = result as boolean);
    spectator.component.onCheckboxClick();
    expect(isSelected).toBe(true);
  });


});
