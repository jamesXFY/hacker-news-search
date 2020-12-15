import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericPagination } from 'src/app/interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  /**
   * input pagination
   */
  @Input() page!: GenericPagination;

  /**
   * output page number
   */
  @Output() paginationEmitter: EventEmitter<number> = new EventEmitter();

  /**
   * if current page is first page
   */
  get isFirstPage(): boolean {
    if (this.page && this.page.pagePosition === 0) {
      return true;
    }
    return false;
  }

  /**
   * if current page is last page
   */
  get isLastPage(): boolean {
    if (this.page && this.page.pagePosition === this.page.totalPages - 1) {
      return true;
    }
    return false;
  }

  /**
   * load previous page
   */
  loadPrevious() {
    if (this.isFirstPage) {
      return;
    }

    this.paginationEmitter.emit(this.page.pagePosition - 1);
  }

  /**
   * load next page
   */
  loadNext() {
    if (this.isLastPage) {
      return;
    }

    this.paginationEmitter.emit(this.page.pagePosition + 1);
  }
}
