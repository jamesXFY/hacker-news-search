import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonsModule } from 'src/app/shared/buttons/buttons.module';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {

  const pagination = {
    total: 133,
    pagePosition: 0,
    pageLength: 30,
    totalPages: 5,
  };

  const createComponent = createComponentFactory({
    component: PaginationComponent,
    imports: [ButtonsModule, CommonModule, FlexLayoutModule],
  });
  let spectator: Spectator<PaginationComponent>;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        };
      })
    });
  });

  beforeEach(() => spectator = createComponent());

  it('should create the PaginationComponent', () => {
    const paginationComponent = spectator.component;
    expect(paginationComponent).toBeTruthy();
  });

  it('should be first page and not last page', () => {
    spectator.setInput({
      page: pagination
    });
    spectator.detectChanges();
    expect(spectator.component.isFirstPage).toBe(true);
  });

  it('click previous page should not change page number', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 0,
      pageLength: 30,
      totalPages: 5,
    });
    let pageNum = 0;
    spectator.output('paginationEmitter').subscribe(result => { pageNum = result as any });
    spectator.component.loadPrevious();
    expect(pageNum).toEqual(0);
  });

  it('click next page should emit page number 1', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 0,
      pageLength: 30,
      totalPages: 5,
    });
    let pageNum = 0;
    spectator.output('paginationEmitter').subscribe(result => { pageNum = result as any });
    spectator.component.loadNext();
    expect(pageNum).toEqual(1);
  });

  it('should not be first page and not last page', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 3,
      pageLength: 30,
      totalPages: 5,
    });
    expect(spectator.component.isFirstPage).toBe(false);
    expect(spectator.component.isLastPage).toBe(false);
  });

  it('click previous page should emit page number 2', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 3,
      pageLength: 30,
      totalPages: 5,
    });
    let pageNum = 0;
    spectator.output('paginationEmitter').subscribe(result => { pageNum = result as any });
    spectator.component.loadPrevious();
    expect(pageNum).toEqual(2);
  });

  it('click previous page should emit page number 4', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 3,
      pageLength: 30,
      totalPages: 5,
    });
    let pageNum = 0;
    spectator.output('paginationEmitter').subscribe(result => { pageNum = result as any });
    spectator.component.loadNext();
    expect(pageNum).toEqual(4);
  });

  it('should be last page, but not first page', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 4,
      pageLength: 30,
      totalPages: 5,
    })
    expect(spectator.component.isFirstPage).toBe(false);
    expect(spectator.component.isLastPage).toBe(true);
  });

  it('click next should not emit page number', () => {
    spectator.setInput('page', {
      total: 133,
      pagePosition: 4,
      pageLength: 30,
      totalPages: 5,
    });
    let pageNum = 4;
    spectator.output('paginationEmitter').subscribe(result => { pageNum = result as any });
    spectator.component.loadNext();
    expect(pageNum).toEqual(4);
  });

});
