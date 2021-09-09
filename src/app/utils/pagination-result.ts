export class PaginationResult<E> {
  private limit: number;
  private offset: number;
  private total: number;
  private elements: E[];

  constructor(object?: any) {
    this.limit = object && object.limit;
    this.offset = object && object.offset;
    this.total = object && object.total;
    this.elements = object && object.elements || [];
  }

  setLimit(limit: number): PaginationResult<E> {
    this.limit = limit;
    return this;
  }

  setOffset(offset: number): PaginationResult<E> {
    this.offset = offset;
    return this;
  }

  setTotal(total: number): PaginationResult<E> {
    this.total = total;
    return this;
  }

  setElements(elements: E[]): PaginationResult<E> {
    this.elements = elements;
    return this;
  }

  getLimit(): number {
    return this.limit;
  }

  getOffset(): number {
    return this.offset;
  }

  getTotal(): number {
    return this.total;
  }

  getElements(): E[] {
    return this.elements;
  }
}
