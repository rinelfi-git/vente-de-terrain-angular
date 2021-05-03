export class Pagination<E> {
  limit: number;
  offset: number;
  total: number;
  elements: E[];

  constructor(object?: any) {
    this.limit = object && object.limit;
    this.offset = object && object.offset;
    this.total = object && object.total;
    this.elements = object && object.elements || [];
  }
}
