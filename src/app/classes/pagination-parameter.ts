export class PaginationParameter {
  private namespace: string;
  private limit: number;
  private offset: number;
  private ordered: boolean;
  private orderDirection: string;
  private orderField: string;
  private searchActive: boolean;
  private keywordSearch: string;
  private searchField: string;

  constructor() {
    this.namespace = '/';
    this.limit = 0;
    this.offset = 0;
    this.ordered = false;
    this.orderDirection = 'asc';
    this.orderField = '';
    this.searchActive = false;
    this.keywordSearch = '';
    this.searchField = '';
  }

  setNamespace(namespace: string): PaginationParameter {
    this.namespace = namespace;
    return this;
  }

  setLimit(limit: number): PaginationParameter {
    this.limit = limit;
    return this;
  }

  setOffset(offset: number): PaginationParameter {
    this.offset = offset;
    return this;
  }

  setOrdered(ordered: boolean): PaginationParameter {
    this.ordered = ordered;
    return this;
  }

  setOrderDirection(orderDirection: string): PaginationParameter {
    this.orderDirection = orderDirection;
    return this;
  }

  setOrderField(orderField: string): PaginationParameter {
    this.orderField = orderField;
    return this;
  }

  setSearchActive(searchActive: boolean): PaginationParameter {
    this.searchActive = searchActive;
    return this;
  }

  setKeywordSearch(keywordSearch: string): PaginationParameter {
    this.keywordSearch = keywordSearch;
    return this;
  }

  setSearchField(searchField: string): PaginationParameter {
    this.searchField = searchField;
    return this;
  }

  getNamespace(): string {
    return this.namespace;
  }

  getLimit(): number {
    return this.limit;
  }

  getOffset(): number {
    return this.offset;
  }

  getOrdered(): boolean {
    return this.ordered;
  }

  getOrderDirection(): string {
    return this.orderDirection;
  }

  getOrderField(): string {
    return this.orderField;
  }

  getSearchActive(): boolean {
    return this.searchActive;
  }

  getKeywordSearch(): string {
    return this.keywordSearch;
  }

  getSearchField(): string {
    return this.searchField;
  }

  hasOffsetOf(...args: number[]): boolean {
    let hasOffset = false;
    for (const offset of args) {
      if (this.offset === offset) {
        hasOffset = true;
      }
    }
    return hasOffset;
  }
}
