import {Injectable} from '@angular/core';
import {PaginationResult} from '../utils/pagination-result';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';
import {PaginationParameter} from '../classes/pagination-parameter';

@Injectable({
  providedIn: 'root'
})
export class PaginationService<E> {
  private pagination: PaginationResult<E>;
  subject: Subject<PaginationResult<E>>;

  constructor(private http: HttpClient) {
    this.pagination = new PaginationResult<E>();
    this.subject = new Subject<PaginationResult<E>>();
  }

  emit(): PaginationService<E> {
    this.subject.next(Object.create(this.pagination));
    return this;
  }

  paginer(parameter: PaginationParameter): Promise<void> {
    const url = new Urls().getBackendUrl() + parameter.getNamespace() + 'list-pagination.action';
    const formData = new FormData();
    formData.append('constraint.limit', parameter.getLimit().toString());
    formData.append('constraint.offset', parameter.getOffset().toString());
    formData.append('constraint.ordered', parameter.getOrdered().toString());
    formData.append('constraint.orderDirection', parameter.getOrderDirection());
    formData.append('constraint.orderField', parameter.getOrderField().toString());
    formData.append('constraint.searchActive', parameter.getSearchActive().toString());
    formData.append('constraint.keywordSearch', parameter.getKeywordSearch().toString());
    formData.append('constraint.searchField', parameter.getSearchField());
    return new Promise<void>(send => {
      this.http.post<any>(url, formData).subscribe((pagination: any) => {
        this.pagination = pagination as PaginationResult<E>;
        this.emit();
        send();
      });
    });
  }
}
