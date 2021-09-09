import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = new Urls().getBackendUrl();
  }

  load(): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get<any>(this.url + 'dashboard/recapitulation.action').subscribe(json => {
        resolve(json);
      });
    });
  }
}
