
import { of } from 'rxjs';
import { FilterFields } from '../interfaces/hacker-news-search.interface';
import { HackerNewsAPIService } from './hacker-news-api.service';

describe('HackerNewsAPIService', () => {
  let service: HackerNewsAPIService;
  let mockHttpClient = {
    get: jest.fn()
  }

  let mockData = {
    "hits": [
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
    "nbHits": 23030003,
    "page": 0,
    "nbPages": 34,
    "hitsPerPage": 30,
  }

  let mockNewsTypeFilter: FilterFields = {
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

  let mockPopularOrDate: FilterFields = {
    "type": "single-select",
    "title": "Popularity Or Date",
    "properties": {
      "values": [
        {
          "text": "Popularity",
          "value": "Popularity",
        },
        {
          "text": "Date",
          "value": "Date",
          "selected": true
        }
      ]
    }
  }

  let mockTimeRangeFilter: FilterFields = {
    "type": "single-select",
    "title": "Date Range",
    "properties": {
      "values": [
        {
          "text": "All Time",
          "value": 'All',
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

  beforeEach(() => {
    service = new HackerNewsAPIService(mockHttpClient as any);
    mockHttpClient.get.mockImplementationOnce(() => of(mockData));
  });

  it('HackerNewsAPIService should be initialized', () => {
    expect(service).toBeDefined();
  });

  it('#searchByInput should return value', done => {
    service.searchByInput('search str').subscribe(result => {
      expect(mockHttpClient.get.mock.calls[0][0]).toBe("http://hn.algolia.com/api/v1/search");
      expect(mockHttpClient.get.mock.calls[0][1].params.updates[0].value).toBe("");
      expect(mockHttpClient.get.mock.calls[0][1].params.updates[1].value).toBe("search str");
      expect(result.table.news.length).toBe(2);
      expect(result.table.pagination.totalPages).toBe(34);
      done();
    })
  });

  it('#filterByInputs request params tags should be empty', done => {
    mockHttpClient.get.mockImplementationOnce(() => of(mockData))
    service.filterByInputs(mockNewsTypeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[1][0]).toBe("http://hn.algolia.com/api/v1/search");
      expect(mockHttpClient.get.mock.calls[1][1].params.updates[1].param).toBe("tags");
      expect(mockHttpClient.get.mock.calls[1][1].params.updates[1].value).toBe("()");
      done();
    })
  });

  it('#filterByInputs request params tags should be story', done => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    service.filterByInputs(mockNewsTypeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[2][0]).toBe("http://hn.algolia.com/api/v1/search");
      expect(mockHttpClient.get.mock.calls[2][1].params.updates[1].param).toBe("tags");
      expect(mockHttpClient.get.mock.calls[2][1].params.updates[1].value).toBe("(story)");
      done();
    })
  });

  it('#filterByInputs request params tags should be (story, comment)', done => {
    mockNewsTypeFilter.properties.values[0].selected = true;
    mockNewsTypeFilter.properties.values[1].selected = true;
    service.filterByInputs(mockNewsTypeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[3][0]).toBe("http://hn.algolia.com/api/v1/search");
      expect(mockHttpClient.get.mock.calls[3][1].params.updates[1].param).toBe("tags");
      expect(mockHttpClient.get.mock.calls[3][1].params.updates[1].value).toBe("(story,comment)");
      done();
    })
  });

  it('#filterByInputs request url should be by date', done => {
    service.filterByInputs(mockPopularOrDate).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[4][0]).toBe("http://hn.algolia.com/api/v1/search_by_date");
      done();
    })
  });

  it('#filterByInputs request url should be by popularity', done => {
    mockPopularOrDate.properties.values[1].selected = false;
    service.filterByInputs(mockPopularOrDate).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[5][0]).toBe("http://hn.algolia.com/api/v1/search");
      done();
    })
  });

  it('#filterByInputs request time range should be 24H', done => {
    mockTimeRangeFilter.properties.values[1].selected = true;
    const currentTime = new Date().getTime() - (24 * 60 * 60 * 1000);
    service.filterByInputs(mockTimeRangeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[6][1].params.updates[1].param).toBe("numericFilters");
      expect(mockHttpClient.get.mock.calls[6][1].params.updates[1].value).toBe(`created_at_i>${currentTime / 1000}`);
      done();
    })
  });

  it('#filterByInputs request time range should be 1 week', done => {
    mockTimeRangeFilter.properties.values[1].selected = false;
    mockTimeRangeFilter.properties.values[2].selected = true;
    const currentData = new Date();
    const currentTime = currentData.setDate(currentData.getDate() - 7);
    service.filterByInputs(mockTimeRangeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[7][1].params.updates[1].param).toBe("numericFilters");
      expect(mockHttpClient.get.mock.calls[7][1].params.updates[1].value).toBe(`created_at_i>${currentTime / 1000}`);
      done();
    })
  });

  it('#filterByInputs request time range should be 1 month', done => {
    mockTimeRangeFilter.properties.values[2].selected = false;
    mockTimeRangeFilter.properties.values[3].selected = true;
    const currentData = new Date();
    const currentTime = currentData.setMonth(currentData.getMonth() - 1);
    service.filterByInputs(mockTimeRangeFilter).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[8][1].params.updates[1].param).toBe("numericFilters");
      expect(mockHttpClient.get.mock.calls[8][1].params.updates[1].value).toBe(`created_at_i>${currentTime / 1000}`);
      done();
    })
  });

  it('#filterByInputs request time range should be 1 year', done => {
    mockTimeRangeFilter.properties.values[3].selected = false;
    mockTimeRangeFilter.properties.values[4].selected = true;
    const currentData = new Date();
    const currentTime = currentData.setFullYear(currentData.getFullYear() - 1);
    service.filterByInputs(mockTimeRangeFilter).subscribe(result => {
      expect(mockTimeRangeFilter.properties.values[1].selected).toBe(false);
      expect(mockHttpClient.get.mock.calls[9][1].params.updates[1].param).toBe("numericFilters");
      expect(mockHttpClient.get.mock.calls[9][1].params.updates[1].value).toBe(`created_at_i>${currentTime / 1000}`);
      done();
    })
  });

  it('#fetchTableByPage should return value', done => {
    service.fetchTableByPage(2).subscribe(result => {
      expect(mockHttpClient.get.mock.calls[10][0]).toBe("http://hn.algolia.com/api/v1/search");
      expect(mockHttpClient.get.mock.calls[10][1].params.updates[1].param).toBe("page");
      expect(mockHttpClient.get.mock.calls[10][1].params.updates[1].value).toBe("2");
      done();
    })
  });
});