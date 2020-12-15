import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, startWith } from 'rxjs/operators';
import { FilterFields, OnePageData } from './interfaces/hacker-news-search.interface';
import { HackerNewsAPIService } from './services/hacker-news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** subject listen to search input */
  private searchTextChanged = new Subject<string>();
  /** subject listen to filter input */
  private filterItemsChanged = new Subject<FilterFields>();
  /** subject listen to page input */
  private pageChanged = new Subject<number>();
  /** observable with all page data */
  public pageDataObservable$!: Observable<OnePageData>;

  constructor(private hackerNewsApiService: HackerNewsAPIService) { }

  ngOnInit() {
    const searchObservable$ = this.searchTextChanged.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(searchText => this.search(searchText))
    );

    const filterObservable$ = this.filterItemsChanged.pipe(
      debounceTime(500),
      mergeMap((filterField: FilterFields) => this.filter(filterField))
    );

    const pageObservable$ = this.pageChanged.pipe(
      debounceTime(300),
      mergeMap((pageNumber: number) => this.paginate(pageNumber))
    );

    this.pageDataObservable$ = merge(searchObservable$, filterObservable$, pageObservable$);
  }

  /**
   * trigger search subject when search input
   * @param event 
   */
  searchTable(event: string) {
    this.searchTextChanged.next(event)
  }

  /**
   * trigger filter subject when filter inputs
   * @param event 
   */
  filterTable(event: FilterFields) {
    this.filterItemsChanged.next(event);
  }

  /**
   * trigger page subject when page number input
   * @param event 
   */
  onPaginate(event: number) {
    this.pageChanged.next(event);
  }

  /**
   * fetch table data with search text
   * @param searchText 
   */
  search(searchText: string): Observable<OnePageData> {
    return this.hackerNewsApiService.searchByInput(searchText);
  }

  /**
   * fetch table data with filter inputs
   * @param filterField 
   */
  filter(filterField: FilterFields): Observable<OnePageData> {
    return this.hackerNewsApiService.filterByInputs(filterField);
  }

  /**
   * fetch table data by page numbers
   * @param pageNumber 
   */
  paginate(pageNumber: number): Observable<OnePageData> {
    return this.hackerNewsApiService.fetchTableByPage(pageNumber);
  }
}
