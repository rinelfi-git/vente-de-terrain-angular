import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UtilisateurService} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {
  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionActive = this.utilisateurService.verifierSession();
    if (typeof sessionActive === 'boolean') {
      if (!sessionActive) {
        this.router.navigate(['/', 'connexion']);
        localStorage.removeItem('token');
        console.log('remove token');
      }
    } else {
      sessionActive.then(valide => {
        if (!valide) {
          this.router.navigate(['/', 'connexion']);
          localStorage.removeItem('token');
          console.log('remove token');
        }
      });
    }
    return sessionActive;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionActive = this.utilisateurService.verifierSession();
    if (typeof sessionActive === 'boolean') {
      if (!sessionActive) {
        this.router.navigate(['/', 'connexion']);
        localStorage.removeItem('token');
        console.log('remove token');
      }
    } else {
      sessionActive.then(valide => {
        if (!valide) {
          this.router.navigate(['/', 'connexion']);
          localStorage.removeItem('token');
          console.log('remove token');
        }
      });
    }
    return sessionActive;
  }
}
