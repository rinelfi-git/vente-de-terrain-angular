import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string;
  private clients: Client[];
  public subject: Subject<Client[]>;

  constructor(private requete: HttpClient) {
    this.url = new Urls().getBackendUrl();
    this.clients = [];
    this.subject = new Subject<Client[]>();
  }

  emit(): ClientService {
    this.subject.next(this.clients.slice());
    return this;
  }

  select(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.requete.get<Client[]>(this.url + 'client/list.action').subscribe((clients: Client[]) => {
        this.clients = clients === null ? [] : clients.map(client => new Client(client));
        this.emit();
        resolve(true);
      });
    });
  }

  insert(client: Client): Promise<boolean> {
    return new Promise<boolean>((resolve => {
      this.requete.post(this.url + 'client/insert.action', client).subscribe(() => {
        resolve(true);
      });
    }));
  }

  update(client: Client): Promise<boolean> {
    return new Promise<boolean>((resolve => {
      this.requete.post(this.url + 'client/update.action', client).subscribe(() => {
        resolve(true);
      });
    }));
  }

  delete(cin: string): Promise<boolean> {
    return new Promise<boolean>((resolve => {
      this.requete.get(this.url + 'client/delete.action?cin=' + cin).subscribe(() => {
        resolve(true);
      });
    }));
  }

}
