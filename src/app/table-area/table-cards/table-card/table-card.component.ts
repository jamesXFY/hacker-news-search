import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'hns-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCardComponent {
  /**
   * table product
   * TableProductsFields type
   */
  @Input() url?: string;
  @Input() title?: string;
  @Input() commentText?: string;
  @Input() points?: number;
  @Input() author?: string;
  @Input() created_at_i?: number;
  @Input() num_comments?: number;
  @Input() firstTags?: string[];
}
