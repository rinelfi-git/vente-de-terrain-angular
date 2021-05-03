import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';
import {Utilisateur} from '../entity/utilisateur';
import {Subject} from 'rxjs';
import {Token} from '../utils/token/token';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private url: string;
  private utilisateurConnecte: Utilisateur;
  utilisateurSubject: Subject<Utilisateur>;

  constructor(private http: HttpClient) {
    const urls = new Urls();
    this.url = urls.getBackendUrl();
    this.utilisateurConnecte = new Utilisateur();
    this.utilisateurSubject = new Subject<Utilisateur>();
  }

  sessionEmit(): void {
    this.utilisateurSubject.next(Object.create(this.utilisateurConnecte));
  }

  verifierSession(): boolean | Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const formData = new FormData();
      formData.append('token', token);
      return new Promise<boolean>(resolve => {
        this.http.post(this.url + 'utilisateur/verifier-token.action', formData).subscribe((response: any) => {
          if (response.verifier) {
            localStorage.setItem('token', response.token);
          }
          resolve(response.verifier);
        });
      });
    }
    return false;
  }

  login(formData: FormData): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(this.url + 'utilisateur/login.action', formData).subscribe((response: any) => {
          if (response.status) {
            localStorage.setItem('token', response.token);
          }
          resolve(response.status);
        },
        error => reject(error));
    });
  }

  actualiserSession(): Promise<any> {
    return new Promise<any>(resolve => {
      const stringToken = localStorage.getItem('token');
      if (stringToken != null && typeof stringToken !== 'undefined') {
        const tokenDecode = atob(stringToken);
        const token = new Token(JSON.parse(tokenDecode));
        this.utilisateurConnecte = new Utilisateur(token.getPayload());
        this.sessionEmit();
        resolve(this.utilisateurConnecte);
      }
    });
  }
}
