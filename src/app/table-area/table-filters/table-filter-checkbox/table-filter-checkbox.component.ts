import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hns-table-filter-checkbox',
  templateUrl: './table-filter-checkbox.component.html',
  styleUrls: ['./table-filter-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterCheckboxComponent {
  /** checkbox type */
  @Input() checkboxType?: string;
  /** checkbox label */
  @Input() displayText?: string;
  /** if checkbox be selected */
  @Input() selected?: boolean;
  /** checkbox input name */
  @Input() name?: string;


  /** emit when checkbox be selected or unselected */
  @Output() valueChange = new EventEmitter<boolean>();

  get inputType(): string {
    switch (this.checkboxType) {
      case 'multi-select': return 'checkbox';
      case 'single-select': return 'radio';
    }
    return '';
  }

  onCheckboxClick() {
    this.selected = !this.selected;
    this.valueChange.emit(this.selected);
  }
}
