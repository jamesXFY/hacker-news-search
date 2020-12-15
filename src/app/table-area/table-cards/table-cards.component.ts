import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TablenewsFields } from '../../interfaces/hacker-news-search.interface';

@Component({
  selector: 'hns-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCardsComponent {
  /**
   * table news
   * TablenewsFields array type
   */
  @Input() tableCards!: TablenewsFields[];
}
