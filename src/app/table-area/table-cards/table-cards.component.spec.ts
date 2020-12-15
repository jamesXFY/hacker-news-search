import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { TableCardModule } from './table-card/table-card.module';
import { TableCardsComponent } from './table-cards.component';

describe('TableCardsComponent', () => {

  const createComponent = createComponentFactory({
    component: TableCardsComponent,
    imports: [CommonModule, TableCardModule],
  });
  let spectator: Spectator<TableCardsComponent>;

  beforeEach(() => spectator = createComponent());

  it('should create the TableCardsComponent', () => {
    const tableCardsComponent = spectator.component;
    expect(tableCardsComponent).toBeTruthy();
  });
});
