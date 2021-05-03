import {Component, OnDestroy, OnInit} from '@angular/core';
import {Urls} from '../../utils/urls';
import {Subscription} from 'rxjs';
import {Utilisateur} from '../../entity/utilisateur';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Router} from '@angular/router';

@Component({
  selector   : 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls  : ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {

  routeActive: string;
  urls: Urls | any;
  ecouteurSession: Subscription;
  utilisateurConnecte: Utilisateur;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {
    this.routeActive = 'home';
    this.ecouteurSession = new Subscription();
    this.utilisateurConnecte = new Utilisateur();
  }

  ngOnInit(): void {
    this.urls = new Urls();
    this.ecouteurSession = this.utilisateurService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => this.utilisateurConnecte = utilisateur);
    this.utilisateurService.actualiserSession();
  }

  setRouteActive(route: string): void {
    this.routeActive = route;
  }

  deconnexion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/', 'connexion']);
  }

  ngOnDestroy(): void {
    this.ecouteurSession.unsubscribe();
  }
}
