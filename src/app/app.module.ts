import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HammerModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import * as $ from 'jquery';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientPresentationComponent} from './component/client/client-presentation/client-presentation.component';
import {ClientPresentationCardComponent} from './component/client/client-presentation-card/client-presentation-card.component';
import {ClientPhotoComponent} from './component/client/client-photo/client-photo.component';
import {ClientUpdateComponent} from './component/client/client-update/client-update.component';
import {ClientInsertComponent} from './component/client/client-insert/client-insert.component';
import {FooterComponent} from './component/footer/footer.component';
import {LoginComponent} from './component/login/login.component';
import {MainBodyComponent} from './component/main-body/main-body.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {TopNavComponent} from './component/top-nav/top-nav.component';
import {TerrainPresentationComponent} from './component/terrain/terrain-presentation/terrain-presentation.component';
import {TerrainInsertComponent} from './component/terrain/terrain-insert/terrain-insert.component';
import {TerrainPreviewComponent} from './component/terrain/terrain-preview/terrain-preview.component';
import {TerrainPresentationCardComponent} from './component/terrain/terrain-presentation-card/terrain-presentation-card.component';
import {TerrainUpdateComponent} from './component/terrain/terrain-update/terrain-update.component';
import {VentePresentationComponent} from './component/vente/vente-presentation/vente-presentation.component';
import {VentePresentationCardComponent} from './component/vente/vente-presentation-card/vente-presentation-card.component';
import {VenteChoixUtilisateurComponent} from './component/vente/vente-choix-utilisateur/vente-choix-utilisateur.component';
import {AuthGuardService} from './service/auth-guard.service';
import {AccueilComponent} from './component/accueil/accueil.component';
import {LoginGuardService} from './service/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientPresentationComponent,
    ClientPresentationCardComponent,
    ClientPhotoComponent,
    ClientUpdateComponent,
    ClientInsertComponent,
    FooterComponent,
    LoginComponent,
    MainBodyComponent,
    NotFoundComponent,
    TopNavComponent,
    TerrainPresentationComponent,
    TerrainInsertComponent,
    TerrainPreviewComponent,
    TerrainPresentationCardComponent,
    TerrainUpdateComponent,
    VentePresentationComponent,
    VentePresentationCardComponent,
    VenteChoixUtilisateurComponent,
    AccueilComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SweetAlert2Module.forRoot(),
    ImageCropperModule,
    HttpClientModule
  ],
  providers   : [AuthGuardService, LoginGuardService],
  bootstrap   : [AppComponent]
})
export class AppModule {}
