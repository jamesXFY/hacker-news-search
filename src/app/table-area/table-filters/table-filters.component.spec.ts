import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { TableFiltersComponent } from './table-filters.component';
import { TableFilterCheckboxListModule } from './table-filter-checkbox-list/table-filter-checkbox.module';
import { TableFilterDropDownCheckboxModule } from './table-filter-dropdown-checkbox/table-filter-dropdown-checkbox.module';
import { FilterFields } from 'src/app/interfaces/hacker-news-search.interface';

describe('TableAreaComponent', () => {

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
    component: TableFiltersComponent,
    imports: [CommonModule, TableFilterCheckboxListModule, TableFilterDropDownCheckboxModule]
  });
  let spectator: Spectator<TableFiltersComponent>;

  beforeEach(() => spectator = createComponent({
    props: {
      tableFilters: [mockNewsTypeFilter]
    }
  }));

  it('should create the TableFiltersComponent', () => {
    const tableFiltersComponent = spectator.component;
    expect(tableFiltersComponent).toBeTruthy();
  });

  it('should emit when filter option be updated', () => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    let output: FilterFields;
    spectator.output('filterEmitter').subscribe(result => output = result as FilterFields);
    spectator.component.filterOptionUpdated(mockNewsTypeFilter, mockNewsTypeFilter.properties.values)
    expect(output!.properties.values[0].selected).toBe(true);
  });
});