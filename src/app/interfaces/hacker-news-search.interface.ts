interface GenericItem {
  text?: string;
  icon?: string;
  tooltip?: string;
}

interface GenericFieldCollection {
  values: GenericItem[];
}

interface GenericFields {
  type?: string;
  text?: string;
  tooltip?: string;
  title?: string;
  icon?: string;
  properties?: GenericFieldCollection;
}

interface GenericPagination {
  total: number;
  pagePosition: number;
  pageLength: number;
  totalPages: number;
}

interface FilterItem extends GenericItem {
  selected?: boolean;
  textToImg?: boolean; // does the text need to transfer to img
  contentImgSrc?: string; // if text need to transfer to img, this is the src
  value?: string | boolean | number; // the value of the item
}

interface FilterFieldCollection {
  values: FilterItem[];
}

interface FilterFields extends GenericFields {
  searchable?: boolean;
  properties: FilterFieldCollection;
}

interface Filter {
  fields: FilterFields[];
}

// Table

interface TablenewsFields {
  url?: string;
  title?: string;
  comment_text?: string;
  points?: number;
  author?: string;
  created_at_i?: number;
  num_comments?: number;
  _tags?: string[];
}

interface Table {
  /** Entire table title */
  title?: string;
  news: TablenewsFields[];
  pagination: GenericPagination;
}

interface OnePageData {
  filters: FilterFields[];
  table: Table;
}

interface OnePage {
  data: OnePageData;
}

export {
  GenericItem,
  GenericFieldCollection,
  GenericFields,
  GenericPagination,
  FilterItem,
  FilterFieldCollection,
  FilterFields,
  Filter,
  TablenewsFields,
  Table,
  OnePageData,
  OnePage,
};
