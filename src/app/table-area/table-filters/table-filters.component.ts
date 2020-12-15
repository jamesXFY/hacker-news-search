import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FilterFields, FilterItem } from '../../interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFiltersComponent {
  /**
   * table filter property
   */
  @Input() tableFilters?: FilterFields[];

  /**
   * emitter for filter action
   */
  @Output() filterEmitter = new EventEmitter();

  /** update when option selected */
  public filterOptionUpdated(filter: FilterFields, filterOptions: FilterItem[]) {
    filter.properties.values = filterOptions.slice();
    this.filterEmitter.next(filter);
  }
}
