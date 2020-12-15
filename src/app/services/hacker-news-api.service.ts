import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { constants } from '../environment/constants';
import { FilterFields, FilterItem, OnePageData } from '../interfaces/hacker-news-search.interface';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsAPIService {
  /**
   * endpoints api url
   */
  private apiURL!: string;

  /**
   * defaultHttpParams will store sequenced search, filter and page infor
   */
  private defaultHttpParams = new HttpParams().set('query', '');

  /**
   * filters stores default filter parameteres
   */
  private filters: FilterFields[] = [
    {
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
    },
    {
      "type": "single-select",
      "title": "Popularity Or Date",
      "properties": {
        "values": [
          {
            "text": "Popularity",
            "value": "Popularity",
            "selected": true
          },
          {
            "text": "Date",
            "value": "Date"
          }
        ]
      }
    },
    {
      "type": "single-select",
      "title": "Date Range",
      "properties": {
        "values": [
          {
            "text": "All Time",
            "value": 'All',
            "selected": true
          },
          {
            "text": "Last 24H",
            "value": '24H'
          },
          {
            "text": "Passed Week",
            "value": '1W'
          },
          {
            "text": "Passed Month",
            "value": '1M'
          },
          {
            "text": "Passed Year",
            "value": '1Y'
          },
        ]
      }
    }
  ]

  constructor(private http: HttpClient) {
    this.apiURL = `${constants.apiUrl}/search`;
  }

  /**
   * query hacker news by str
   * @param queryStr 
   */
  public searchByInput(queryStr: string): Observable<OnePageData> {
    this.defaultHttpParams = this.defaultHttpParams.set('query', queryStr);

    return this.http.get(this.apiURL, { params: this.defaultHttpParams }).pipe(
      map(data => this.reassembleData(data)),
      share()
    );
  }

  /**
   * filter hacker news based on filter input
   * @param filter 
   */
  public filterByInputs(filter: FilterFields): Observable<OnePageData> {
    this.reassembleParams(filter);

    return this.http.get(this.apiURL, { params: this.defaultHttpParams }).pipe(
      map(data => this.reassembleData(data)),
      share()
    )
  }

  /**
   * fetch hacker news based on page number
   * @param pageNumber 
   */
  public fetchTableByPage(pageNumber: number): Observable<OnePageData> {
    this.defaultHttpParams = this.defaultHttpParams.set('page', `${pageNumber}`);

    return this.http.get(this.apiURL, { params: this.defaultHttpParams }).pipe(
      map(data => this.reassembleData(data)),
      share()
    )
  }

  /**
   * when there is filter inputs
   * reassemble http params
   * @param filter 
   */
  private reassembleParams(filter: FilterFields) {
    this.mapFilterToParams(filter);
  }

  /**
   * map filter params to http params
   * @param filterField 
   */
  private mapFilterToParams(filterField: FilterFields) {
    switch (filterField.title) {
      case 'News Type': {
        const tags: any[] = [];
        filterField.properties.values.forEach((filterItem: FilterItem) => {
          if (filterItem.selected) {
            tags.push(filterItem.value);
          }
        });
        this.defaultHttpParams = this.defaultHttpParams.set('tags', `(${tags.join(',')})`);
        break;
      }
      case 'Popularity Or Date': {
        const tags: any[] = [];
        const filterItem = filterField.properties.values.find((filterItem: FilterItem) => {
          if (filterItem.selected) {
            return true;
          }

          return false;
        });

        if (filterItem?.value === 'Date') {
          this.apiURL = `${constants.apiUrl}/search_by_date`;
        } else {
          this.apiURL = `${constants.apiUrl}/search`;
        }
        break;
      }
      case 'Date Range': {
        let createAfter: number = 0;
        filterField.properties.values.forEach((filterItem: FilterItem) => {
          if (filterItem.selected) {
            createAfter = this.calcDate(filterItem.value!.toString());
          }
        });
        if (createAfter > 0) {
          this.defaultHttpParams = this.defaultHttpParams.set('numericFilters', `created_at_i>${createAfter / 1000}`)
        }

        break;
      }
    }
  }

  /**
   * map http respond data to onepageData
   * @param data 
   */
  private reassembleData(data: any): OnePageData {
    return {
      filters: this.filters,
      table: {
        news: data.hits,
        pagination: {
          total: 0,
          pagePosition: data.page,
          pageLength: data.hitsPerPage,
          totalPages: data.nbPages,
        }
      }
    };
  }

  /**
   * calc seconds based on filter inputs
   * @param dataRange 
   */
  private calcDate(dataRange: string): number {
    const currentData = new Date();

    switch (dataRange) {
      case '24H': return currentData.getTime() - (24 * 60 * 60 * 1000);
      case '1W': return currentData.setDate(currentData.getDate() - 7);
      case '1M': return currentData.setMonth(currentData.getMonth() - 1);
      case '1Y': return currentData.setFullYear(currentData.getFullYear() - 1);
      default: return 0;
    }
  }
}
