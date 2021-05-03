import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UtilisateurService} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionActive = this.utilisateurService.verifierSession();
    let canActivate = true;

    if (typeof sessionActive === 'boolean') {
      if (sessionActive) {
        this.router.navigate(['/', 'application', 'accueil']);
        canActivate = !sessionActive;
      }
    } else if (typeof sessionActive === 'object' && sessionActive instanceof Promise) {
      sessionActive.then(existe => {
        if (existe) {
          this.router.navigate(['/', 'application', 'accueil']);
          canActivate = !existe;
        }
      });
    }
    
    return canActivate;
  }
}
