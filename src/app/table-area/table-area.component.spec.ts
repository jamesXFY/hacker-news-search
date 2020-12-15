import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaginationModule } from './pagination/pagination.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { TableAreaComponent } from './table-area.component';
import { TableCardModule } from './table-cards/table-card/table-card.module';
import { TableCardsModule } from './table-cards/table-cards.module';
import { TableFiltersModule } from './table-filters/table-filters.module';
import { FilterFields } from '../interfaces/hacker-news-search.interface';

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
    component: TableAreaComponent,
    imports: [CommonModule,
      FlexLayoutModule,
      TableCardsModule,
      TableCardModule,
      PaginationModule,
      TableFiltersModule,
      SearchBarModule]
  });
  let spectator: Spectator<TableAreaComponent>;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        };
      })
    });
  });

  beforeEach(() => spectator = createComponent());

  it('should create the TableAreaComponent', () => {
    const tableAreaComponent = spectator.component;
    expect(tableAreaComponent).toBeTruthy();
  });

  it('should return total number of filter as 0', () => {
    expect(spectator.component.selectedFiltersNum).toBe(0);
  });

  it('should return total number of filter as 0', () => {
    spectator.setInput('tableFilters', []);
    expect(spectator.component.selectedFiltersNum).toBe(0);
  });

  it('should return total number of filter as 1', () => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    spectator.setInput('tableFilters', [mockNewsTypeFilter]);
    expect(spectator.component.selectedFiltersNum).toBe(1);
  });

  it('should emit when filter be triggered', () => {
    let output: FilterFields = { properties: { values: [] } };
    spectator.output('onFilter').subscribe(result => output = result as any);
    spectator.component.onFilterEmit(mockNewsTypeFilter);
    expect(output).toBe(mockNewsTypeFilter);
  });

  it('should emit when search be triggered', () => {
    let output = '';
    spectator.output('onSearch').subscribe(result => output = result as any);
    spectator.component.onSearchEmit('search str');
    expect(output).toBe('search str');
  });

  it('should emit when page be triggered', () => {
    let output = 0;
    spectator.output('onPage').subscribe(result => output = result as any);
    spectator.component.onPageEmit(1);
    expect(output).toBe(1);
  });

  it('should set showcontent to false when resize', () => {
    spectator.component.showFilterContent = true;
    spectator.component.onResize();
    expect(spectator.component.showFilterContent).toBe(false);
  });

  it('should set correct sticky when scroll', () => {
    spectator.component.onWindowScroll();
    expect(spectator.component.sticky).toBe(false);
  });

});
