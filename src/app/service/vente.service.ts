import {Injectable} from '@angular/core';
import {Vente} from '../entity/vente';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Urls} from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private ventes: Vente[];
  private url: string;
  subject: Subject<Vente[]>;

  constructor(private http: HttpClient) {
    this.subject = new Subject<Vente[]>();
    this.url = new Urls().getBackendUrl();
    this.ventes = [];
  }

  emit(): VenteService {
    this.subject.next(this.ventes.slice());
    return this;
  }

  insert(vente: Vente): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.post<any>(this.url + 'vente/insert.action', vente).subscribe(response => resolve(response));
    });
  }
}
