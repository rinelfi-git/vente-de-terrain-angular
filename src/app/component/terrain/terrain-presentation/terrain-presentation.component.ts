import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../../entity/client';
import {ScriptLoader} from '../../../utils/script-loader';
import {Subscription} from 'rxjs';
import {PaginationResult} from '../../../utils/pagination-result';
import {PaginationHelper} from '../../../utils/pagination-helper';
import {PaginationParameter} from '../../../classes/pagination-parameter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ClientService} from '../../../service/client.service';
import {PaginationService} from '../../../service/pagination.service';
import {Urls} from '../../../utils/urls';
import {Terrain} from '../../../entity/terrain';
import {TerrainService} from '../../../service/terrain.service';

@Component({
  selector   : 'app-terrain-presentation',
  templateUrl: './terrain-presentation.component.html',
  styleUrls  : ['./terrain-presentation.component.scss'],
  providers: [TerrainService]
})
export class TerrainPresentationComponent implements OnInit, OnDestroy {
  terrains: Terrain[] = [];
  clients: Client[] = [];
  clientsView: Client[] = [];
  scriptLoader: ScriptLoader;
  terrainPaginationSubscription: Subscription;
  souscriptionClients: Subscription;
  url: string;
  terrainHost: string;

  // Pagination
  pagination: PaginationResult<Terrain>;
  paginationHelper: PaginationHelper;
  boutonPages: number[] = [];
  vueParPage = 0;
  paginationParameter: PaginationParameter;

  // component d'ajout
  insertGroup: FormGroup;
  insertSearchClientActive: boolean;

  // component de photo
  statePhoto: any;
  photoScript: string[] = [];

  childStates: any;

  constructor(
    private title: Title,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private paginationService: PaginationService<Terrain>
  ) {
    this.scriptLoader = new ScriptLoader();
    this.terrainPaginationSubscription = new Subscription();
    this.souscriptionClients = new Subscription();
    this.url = '';
    this.terrainHost = '';
    this.pagination = new PaginationResult<Terrain>();
    this.paginationHelper = new PaginationHelper();
    this.paginationParameter = new PaginationParameter();
    this.insertGroup = this.formBuilder.group({});
    this.insertSearchClientActive = false;
  }

  ngOnInit(): void {
    this.title.setTitle('gestion du terrain');

    this.url = new Urls().getBackendUrl();
    this.terrainHost = new Urls().getTerrainServerUrl();

    this.scriptLoader = new ScriptLoader();
    this.scriptLoader.append('assets/scripts/terrain.js');
    this.scriptLoader.load();

    this.vueParPage = 6;
    this.paginationHelper = new PaginationHelper().setOffset(this.vueParPage).setPageCourante(1).setNombreMaximalBouton(5);

    this.terrainPaginationSubscription = this.paginationService.subject.subscribe((pagination: PaginationResult<Terrain>) => {
      pagination = new PaginationResult<Terrain>(pagination);
      this.pagination = pagination;
      this.pagination.setElements(pagination.getElements().map(element => new Terrain(element)));
      this.paginationHelper.setTotalEnregistrement(this.pagination.getTotal());
      this.boutonPages = this.paginationHelper.getPages();
      this.terrains = this.pagination.getElements();
      this.scriptLoader.reload();
    });

    this.souscriptionClients = this.clientService.subject.subscribe((clients: Client[]) => {
      this.clients = clients;
      this.clientsView = clients.slice();
    });

    this.paginationService.emit();
    this.clientService.emit().select();
    this.paginationParameter = new PaginationParameter();

    this.paginationParameter.setNamespace('terrain/');
    this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
    this.paginationParameter.setOffset(this.vueParPage);
    this.paginationParameter.setOrdered(false);
    this.paginationParameter.setSearchActive(false);

    this.paginationService.paginer(this.paginationParameter);
  }


  // Pagination
  naviguerPage(page: number): void {
    this.paginationHelper.setPageCourante(page);
    this.boutonPages = this.paginationHelper.getPages();
    this.reloadView();
  }

  naviguerAvant(page: number): void {
    this.paginationHelper.setPageCourante(page);
    this.paginationHelper.next();
    this.boutonPages = this.paginationHelper.getPages();
    this.reloadView();
  }

  naviguerArriere(page: number): void {
    this.paginationHelper.setPageCourante(page);
    this.paginationHelper.prev();
    this.boutonPages = this.paginationHelper.getPages();
    this.reloadView();
  }

  reloadView(): void {
    this.terrains = [];
    this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
    this.paginationService.paginer(this.paginationParameter).then(() => {
      this.scriptLoader.reload();
    });
  }

  // Pagination
  initInsertForm(): void {
    this.insertGroup = this.formBuilder.group({
      localisation         : this.formBuilder.control('', Validators.required),
      rechercheProprietaire: this.formBuilder.control(''),
      proprietaire         : this.formBuilder.control('', Validators.required),
      surface              : this.formBuilder.control('', Validators.required),
      prixParMetreCarre    : this.formBuilder.control('', Validators.required),
      relief               : this.formBuilder.control('', Validators.required),
      enVente              : this.formBuilder.control(false)
    });
  }

  insertAction(statusSucces: boolean): void {
    if (statusSucces) {
      document.querySelectorAll('.modal').forEach(element => element.dispatchEvent(new Event('hide')));
      this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
      this.reloadView();
    }
  }

  ngOnDestroy(): void {
    this.scriptLoader.destroy();
    this.terrainPaginationSubscription.unsubscribe();
    this.souscriptionClients.unsubscribe();
  }
}
