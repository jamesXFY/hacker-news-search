import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { sep } from 'path';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterFields } from './interfaces/hacker-news-search.interface';
import { HackerNewsAPIService } from './services/hacker-news-api.service';
import { TableAreaModule } from './table-area/table-area.module';


describe('AppComponent', () => {
  const mockNewsTypeFilter: FilterFields = {
    "type": "multi-select",
    "title": "News Type",
    "properties": {
      "values": [
        {
          "text": "Stories",
          "value": "story"
        },
        {
          "text": "Comments",
          "value": "comment"
        }
      ]
    }
  }
  const mockResult = {
    "filters": [mockNewsTypeFilter],
    "table": {
      "news": [
        {
          "created_at": "2018-03-14T03:50:30.000Z",
          "title": "Stephen Hawking has died",
          "url": "http://www.bbc.com/news/uk-43396008",
          "author": "Cogito",
          "points": 6015,
          "num_comments": 436,
          "created_at_i": 1520999430,
          "_tags": ["story", "author_Cogito", "story_16582136"],
        },
        {
          "created_at": "2016-02-17T08:38:37.000Z",
          "title": "A Message to Our Customers",
          "url": "http://www.apple.com/customer-letter/",
          "author": "epaga",
          "points": 5771,
          "num_comments": 967,
          "created_at_i": 1455698317,
          "_tags": ["story", "author_epaga", "story_11116274"],
        }
      ],
      "pagination": {
        total: 133,
        pagePosition: 0,
        pageLength: 30,
        totalPages: 5,
      }
    }
  }
  const mockService = { searchByInput: (param: any) => of(mockResult), filterByInputs: (param: any) => of(mockResult), fetchTableByPage: (param: any) => of(mockResult) };
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [BrowserModule,
      AppRoutingModule,
      TableAreaModule,
      HttpClientModule,],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: HackerNewsAPIService, useValue: mockService }]
  });
  let spectator: Spectator<AppComponent>;

  beforeEach(() => spectator = createComponent());

  it('should create the AppComponent', () => {
    const appComponent = spectator.component;
    expect(appComponent).toBeTruthy();
  });

  it('should create the one page observable', () => {
    spectator.component.ngOnInit();
    expect(spectator.component.pageDataObservable$).toBeTruthy();
  });

  it('should emit when search be triggered', (done) => {
    spectator.component.searchTable('search text');
    spectator.component.pageDataObservable$.subscribe(result => {
      expect(result).toBe(mockResult);
      done();
    })
  });

  it('should emit when filter be triggered', (done) => {
    spectator.component.filterTable(mockNewsTypeFilter);
    spectator.component.pageDataObservable$.subscribe(result => {
      expect(result).toBe(mockResult);
      done();
    })
  });

  it('should emit when page be triggered', (done) => {
    spectator.component.onPaginate(1);
    spectator.component.pageDataObservable$.subscribe(result => {
      expect(result).toBe(mockResult);
      done();
    })
  });
});
