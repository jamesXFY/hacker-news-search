import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {

  const createComponent = createComponentFactory({
    component: SearchBarComponent,
    imports: [CommonModule],
  });
  let spectator: Spectator<SearchBarComponent>;

  beforeEach(() => spectator = createComponent());

  it('should create the SearchBarComponent', () => {
    const searchBarComponent = spectator.component;
    expect(searchBarComponent).toBeTruthy();
  });

  it('onKeyUp should emit correct value', () => {
    let inputVal = '';
    spectator.output('searchTextEmitter').subscribe(result => inputVal = result as any);
    spectator.component.onKeyUp({ target: { value: 'search input' } });
    expect(inputVal).toBe('search input');
  });
});
