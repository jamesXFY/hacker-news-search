import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FilterItem } from '../../../interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-table-filter-checkbox-list',
  templateUrl: './table-filter-checkbox-list.component.html',
  styleUrls: ['./table-filter-checkbox-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterCheckboxListComponent {
  /** filter type */
  @Input() filterType?: string;
  /** filter title */
  @Input() filterTitle?: string;
  /** filter options */
  @Input() filterOptions?: FilterItem[];

  @Output() filterOptionEmitter: EventEmitter<FilterItem[]> = new EventEmitter();

  /** check if any option be selected in this filter */
  public get hasSelected(): boolean {
    if (!this.filterOptions || this.filterOptions.length === 0) {
      return false;
    }

    const checkOption = this.filterOptions.filter((option: FilterItem) => {
      if (option.selected === true) {
        return true;
      } else {
        return false;
      }
    });

    return checkOption.length > 0;
  }

  /** when option be clicked, update filter option */
  public updateOption(option: FilterItem, isSelected: boolean) {
    if (this.filterType === 'single-select') {
      this.filterOptions?.forEach((option: FilterItem) => {
        option.selected = false;
      })
    }

    option.selected = isSelected;
    this.filterOptionEmitter.next(this.filterOptions);
  }

  /** set all options to unselected */
  public removeAllSelected() {
    if (!this.hasSelected) {
      return;
    }

    this.filterOptions?.forEach((option: FilterItem) => {
      option.selected = false;
    });

    this.filterOptionEmitter.next(this.filterOptions);
  }
}
