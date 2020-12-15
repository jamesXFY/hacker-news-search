import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { TableFilterDropdownCheckboxComponent } from './table-filter-dropdown-checkbox.component';
import { TableFilterCheckboxListModule } from '../table-filter-checkbox-list/table-filter-checkbox.module';
import { FilterFields } from 'src/app/interfaces/hacker-news-search.interface';

describe('TableFilterDropdownCheckboxComponent', () => {

  let mockNewsTypeFilter: FilterFields = {
    "type": "multi-select",
    "title": "News Type",
    "properties": {
      "values": [
        {
          "text": "Stories",
          "value": "story"
        },
        {
          "text": "Comments",
          "value": "comment"
        }
      ]
    }
  }

  const createComponent = createComponentFactory({
    component: TableFilterDropdownCheckboxComponent,
    imports: [CommonModule, TableFilterCheckboxListModule]
  });
  let spectator: Spectator<TableFilterDropdownCheckboxComponent>;

  beforeEach(() => spectator = createComponent());

  it('should create the TableFilterDropdownCheckboxComponent', () => {
    const tableFilterDropdownCheckboxComponent = spectator.component;
    expect(tableFilterDropdownCheckboxComponent).toBeTruthy();
  });

  it('should return empty when tableFilter is undefined', () => {
    expect(spectator.component.buttonText).toBe('');
  });

  it('should return Please select when no option be selected', () => {
    spectator.setInput('tableFilter', mockNewsTypeFilter);
    expect(spectator.component.buttonText).toBe('Please select');
  });

  it('should return Stories when option story be selected', () => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    spectator.setInput('tableFilter', mockNewsTypeFilter);
    expect(spectator.component.buttonText).toBe('Stories');
  });

  it('should return (2) selected when 2 options be selected', () => {
    mockNewsTypeFilter.properties.values[1].selected = true;
    spectator.setInput('tableFilter', mockNewsTypeFilter);
    expect(spectator.component.buttonText).toBe('(2) selected');
  });

  it('should return (2) selected when 2 options be selected', () => {
    mockNewsTypeFilter.properties.values[1].selected = true;
    spectator.setInput('tableFilter', mockNewsTypeFilter);
    expect(spectator.component.buttonText).toBe('(2) selected');
  });

  it('should revert showContent value when toggleDropdownState be triggered', () => {
    spectator.component.toggleDropdownState();
    expect(spectator.component.showContent).toBe(true);
    spectator.component.toggleDropdownState();
    expect(spectator.component.showContent).toBe(false);
  });

  it('should set showContent to false when window resize', () => {
    spectator.component.onResize(undefined);
    expect(spectator.component.showContent).toBe(false);
  });

  it('should keep showContent same when click inside native element', () => {
    spectator.component.showContent = true;
    spectator.click(spectator.debugElement.nativeElement);
    expect(spectator.component.showContent).toBe(true);
  });

  it('should set showContent to false when click outside', () => {
    spectator.component.showContent = true;
    const event: MouseEvent = new MouseEvent('click');
    spectator.component.documentClick(event);
    expect(spectator.component.showContent).toBe(false);
  });
});