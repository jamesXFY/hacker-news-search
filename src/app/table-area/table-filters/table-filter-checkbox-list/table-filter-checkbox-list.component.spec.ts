import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { TableFilterCheckboxListComponent } from './table-filter-checkbox-list.component';
import { TableFilterCheckboxModule } from '../table-filter-checkbox/table-filter-checkbox.module';
import { FilterFields } from 'src/app/interfaces/hacker-news-search.interface';

describe('TableAreaComponent', () => {

  let mockNewsTypeFilter: FilterFields = {
    "type": "single-select",
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
    component: TableFilterCheckboxListComponent,
    imports: [CommonModule, TableFilterCheckboxModule]
  });
  let spectator: Spectator<TableFilterCheckboxListComponent>;

  beforeEach(() => spectator = createComponent({
    props: {
      filterType: mockNewsTypeFilter.type,
      filterTitle: mockNewsTypeFilter.title,
      filterOptions: mockNewsTypeFilter.properties.values,
    }
  }));

  it('should create the TableFilterCheckboxListComponent', () => {
    const tableFilterCheckboxListComponent = spectator.component;
    expect(tableFilterCheckboxListComponent).toBeTruthy();
  });

  it('should return correct hasSelected', () => {
    spectator.setInput('filterOptions', undefined);
    expect(spectator.component.hasSelected).toBe(false);
  });

  it('should return correct hasSelected', () => {
    spectator.setInput('filterOptions', []);
    expect(spectator.component.hasSelected).toBe(false);
  });

  it('should return correct hasSelected as true', () => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    expect(spectator.component.hasSelected).toBe(true);
  });

  it('should emit updated options when option selected is changed', () => {
    let updatedOptions = spectator.component.filterOptions;
    spectator.output('filterOptionEmitter').subscribe(result => updatedOptions = result as any);
    spectator.component.updateOption(mockNewsTypeFilter.properties.values[1], true);
    expect(updatedOptions![1].selected).toBe(true);
  });

  it('should emit updated options when all option selected set false', () => {
    let updatedOptions = spectator.component.filterOptions;
    spectator.output('filterOptionEmitter').subscribe(result => updatedOptions = result as any);
    spectator.component.removeAllSelected();
    expect(updatedOptions![0].selected).toBe(false);
    expect(updatedOptions![1].selected).toBe(false);
  });
});