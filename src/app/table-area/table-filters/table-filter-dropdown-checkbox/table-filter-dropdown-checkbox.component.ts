import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FilterFields, FilterItem } from '../../../interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-table-filter-dropdown-checkbox',
  templateUrl: './table-filter-dropdown-checkbox.component.html',
  styleUrls: ['./table-filter-dropdown-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterDropdownCheckboxComponent {
  /** table filter property */
  @Input() tableFilter!: FilterFields;

  @ViewChild('toggleButton', { static: false }) toggleButton!: ElementRef;

  @ViewChild('filterContent', { static: false }) filterContent!: ElementRef;

  /** if the dropdown displayed */
  public showContent: boolean = false;
  /** dropdown input place holder text */
  public selectedText: string = 'Please select';

  constructor(private el: ElementRef) { }

  /** dropdown input text  */
  public get buttonText(): string | undefined {
    if (!this.tableFilter) {
      return '';
    }

    const selectedOptions = this.tableFilter.properties.values.filter((options: FilterItem) => {
      return options.selected === true;
    });

    if (selectedOptions.length <= 0) {
      return 'Please select';
    }

    if (selectedOptions.length > 1) {
      return '(' + selectedOptions.length + ') selected';
    }

    return selectedOptions[0].text;
  }

  /** toggle dropdown */
  public toggleDropdownState() {
    this.showContent = !this.showContent;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showContent = false;
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: any) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showContent = false;
    }
  }
}
