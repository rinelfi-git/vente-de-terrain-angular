import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MainBodyComponent} from './component/main-body/main-body.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {ClientPresentationComponent} from './component/client/client-presentation/client-presentation.component';
import {TerrainPresentationComponent} from './component/terrain/terrain-presentation/terrain-presentation.component';
import {VentePresentationComponent} from './component/vente/vente-presentation/vente-presentation.component';
import {AuthGuardService} from './service/auth-guard.service';
import {AccueilComponent} from './component/accueil/accueil.component';
import {LoginGuardService} from './service/login-guard.service';

const routes: Routes = [
  {path: 'connexion', component: LoginComponent, canActivate: [LoginGuardService]},
  {
    path            : 'application',
    component       : MainBodyComponent,
    canActivate     : [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children        : [
      {path: 'accueil', component: AccueilComponent},
      {path: 'client', component: ClientPresentationComponent},
      {path: 'terrain', component: TerrainPresentationComponent},
      {path: 'vente', component: VentePresentationComponent}
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '', redirectTo: '/connexion', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
