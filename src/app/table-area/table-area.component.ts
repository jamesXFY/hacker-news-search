import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  TablenewsFields,
  FilterFields,
  FilterItem, GenericPagination
} from '../interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-table-area',
  templateUrl: './table-area.component.html',
  styleUrls: ['./table-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAreaComponent {
  /**
   * Category Name
   */
  @Input() categoryName: string = '';
  /**
   * table products
   */
  @Input() tableCards!: TablenewsFields[];

  /**
   * table filters
   */
  @Input() tableFilters!: FilterFields[];

  /**
   * pagination
   */
  @Input() pagination!: GenericPagination;

  /**
   * emitter for search
   */
  @Output() onSearch = new EventEmitter();

  /**
   * emitter for filter
   */
  @Output() onFilter = new EventEmitter();

  /**
 * emitter for filter
 */
  @Output() onPage = new EventEmitter();

  /**
   * toggle filter content
   */
  public showFilterContent = false;

  public sticky = false;

  constructor(private el: ElementRef) { }

  /**
   * when filter be triggered,
   * emit whole filter object
   * @param $event
   */
  public onFilterEmit($event: any) {
    this.onFilter.emit($event);
  }

  /**
   * search table data
   */
  public onSearchEmit($event: any) {
    this.onSearch.emit($event);
  }

  /**
   * when pagination be triggered
   * emit page number
   * @param $event 
   */
  public onPageEmit($event: any) {
    this.onPage.next($event);
  }

  /**
   * toggle filter content
   */
  public toggleFilter() {
    this.showFilterContent = !this.showFilterContent;
  }

  /**
   * get selected filter number
   */
  public get selectedFiltersNum(): number {
    let totalNum = 0;

    if (!this.tableFilters || this.tableFilters.length === 0) {
      return totalNum;
    }

    this.tableFilters.forEach((filterFields: FilterFields) => {
      filterFields.properties.values.forEach((filterItem: FilterItem) => {
        if (filterItem.selected === true) {
          totalNum = totalNum + 1;
        }
      });
    });

    return totalNum;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.showFilterContent = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const tableAreaOffset = this.el.nativeElement.offsetTop;

    if (window.pageYOffset > tableAreaOffset) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
