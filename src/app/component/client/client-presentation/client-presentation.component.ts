import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../../entity/client';
import {ScriptLoader} from '../../../utils/script-loader';
import {Subscription} from 'rxjs';
import {PaginationResult} from '../../../utils/pagination-result';
import {PaginationHelper} from '../../../utils/pagination-helper';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ClientService} from '../../../service/client.service';
import {PaginationService} from '../../../service/pagination.service';
import {Urls} from '../../../utils/urls';
import {PaginationParameter} from '../../../classes/pagination-parameter';
import {ClientSteps} from '../../../utils/client-steps';

@Component({
  selector   : 'app-client-presentation',
  templateUrl: './client-presentation.component.html',
  styleUrls  : ['./client-presentation.component.scss'],
  providers: [ClientService]
})
export class ClientPresentationComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  client: Client;
  scriptLoader: ScriptLoader;
  clientPaginationSubscription: Subscription;
  url: string;
  clientHost: string;

  // Pagination
  pagination: PaginationResult<Client>;
  paginationHelper: PaginationHelper;
  boutonPages: number[] = [];
  paginationParameter: PaginationParameter;
  // constraint forms
  paginationForm: FormGroup;

  // component d'ajout
  ajoutInformationPersonnelGroup: FormGroup;
  ajoutTelephoneGroup: FormGroup;
  insertAddressForm: FormGroup;


  // component de modification
  modificationInformationPersonnelGroup: FormGroup;
  modificationTelephoneGroup: FormGroup;
  modificationAdresseGroup: FormGroup;

  // component de photo
  statePhoto: any;
  photoScript: string[] = [];

  childStates: any;

  constructor(
    private title: Title,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private paginationService: PaginationService<Client>
  ) {
    this.client = new Client();
    this.scriptLoader = new ScriptLoader();
    this.clientPaginationSubscription = new Subscription();
    this.url = '';
    this.clientHost = '';
    this.pagination = new PaginationResult<Client>();
    this.paginationHelper = new PaginationHelper();
    this.paginationParameter = new PaginationParameter();
    this.ajoutInformationPersonnelGroup = this.formBuilder.group({});
    this.ajoutTelephoneGroup = this.formBuilder.group({});
    this.insertAddressForm = this.formBuilder.group({});
    this.modificationInformationPersonnelGroup = this.formBuilder.group({});
    this.modificationTelephoneGroup = this.formBuilder.group({});
    this.modificationAdresseGroup = this.formBuilder.group({});
    this.paginationForm = this.initPaginationForm();
  }

  ngOnInit(): void {
    this.title.setTitle('gestion du client');

    this.url = new Urls().getBackendUrl();
    this.clientHost = new Urls().getProfileServerUrl();

    this.scriptLoader = new ScriptLoader();
    this.photoScript = ['assets/scripts/cropper.js'];
    this.scriptLoader.append('assets/scripts/client.js');
    this.scriptLoader.load();

    this.paginationHelper = new PaginationHelper().setPageCourante(1).setNombreMaximalBouton(5);

    this.clientPaginationSubscription = this.paginationService.subject.subscribe((pagination: PaginationResult<Client>) => {
      pagination = new PaginationResult<Client>(pagination);
      this.pagination = pagination;
      this.pagination.setElements(pagination.getElements().map(element => new Client(element)));
      this.paginationHelper.setTotalEnregistrement(this.pagination.getTotal());
      this.boutonPages = this.paginationHelper.getPages();
      this.clients = this.pagination.getElements();
      this.scriptLoader.reload();
    });
    this.paginationParameter = new PaginationParameter();

    this.paginationParameter.setNamespace('client/');
    this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
    this.paginationParameter.setOffset(6);
    this.paginationParameter.setOrdered(false);
    this.paginationParameter.setSearchActive(false);
    this.paginationHelper.setOffset(this.paginationParameter.getOffset());
    this.paginationService.emit();
    this.clientService.emit().select();
    this.initialiserEvenementGeneral();
    this.initPaginationForm();
    this.paginationFormAction();
  }

  initPaginationForm(): FormGroup {
    const elementForEachPageValue = this.paginationParameter.hasOffsetOf(6, 12, 18, 24) ? this.paginationParameter.getOffset().toString() : 'custom';
    const customElementForEachPageValue = this.paginationParameter.hasOffsetOf(6, 12, 18, 24) ? 0 : this.paginationParameter.getOffset().toString();
    return this.paginationForm = this.formBuilder.group({
      elementForEachPage      : this.formBuilder.control(elementForEachPageValue),
      customElementForEachPage: this.formBuilder.control(customElementForEachPageValue),
      searchField             : this.formBuilder.control(this.paginationParameter.getSearchField() === '' ? 'cin' : this.paginationParameter.getSearchField()),
      sortDirection           : this.formBuilder.control(this.paginationParameter.getOrderDirection() === '' ? 'asc' : this.paginationParameter.getOrderDirection()),
      sortConstraint          : this.formBuilder.control(this.paginationParameter.getOrderField() === '' ? 'nom' : this.paginationParameter.getOrderField()),
      keywordSearch           : this.formBuilder.control(this.paginationParameter.getKeywordSearch())
    });
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
    this.paginationParameter.setSearchActive(this.paginationForm.value.module === '');
    this.paginationParameter.setSearchField(this.paginationForm.value.module);
    this.reloadView();
  }

  naviguerArriere(page: number): void {
    this.paginationHelper.setPageCourante(page);
    this.paginationHelper.prev();
    this.boutonPages = this.paginationHelper.getPages();
    this.reloadView();
  }

  reloadView(): void {
    this.clients = [];
    this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
    this.paginationParameter.setOffset(this.paginationHelper.getOffset());
    this.paginationService.paginer(this.paginationParameter).then(() => {
      this.scriptLoader.reload();
    });
  }

  // Pagination

  initInsertForm(): void {
    this.ajoutInformationPersonnelGroup = this.formBuilder.group({
      cin   : this.formBuilder.control('', [Validators.pattern('[0-9]{5}(1|2){1}[0-9]{6}'), Validators.required]),
      nom   : this.formBuilder.control('', Validators.required),
      prenom: this.formBuilder.control(''),
    });
    this.ajoutTelephoneGroup = this.formBuilder.group({
      telephones: this.formBuilder.array([
        this.formBuilder.control('', [
          Validators.required,
          Validators.pattern('(03){1}[1-9]{1}[0-9]{7}')
        ])
      ])
    });
    this.insertAddressForm = this.formBuilder.group({
      lot       : this.formBuilder.control(''),
      codePostal: this.formBuilder.control('', Validators.required),
      ville     : this.formBuilder.control('', Validators.required),
    });
    this.childStates = {
      titreEtape: 'Information personnel',
      etatEtape : new ClientSteps(),
      rangEtape : 0
    };
    this.childStates.rangEtape = this.childStates.etatEtape.informationPersonnel;
  }

  initialiserFormulaireModification(client: Client): void {
    this.client = client;
    this.modificationInformationPersonnelGroup = this.formBuilder.group({
      cin   : this.formBuilder.control(client.getCin(), [Validators.pattern('[0-9]{5}(1|2){1}[0-9]{6}'), Validators.required]),
      nom   : this.formBuilder.control(client.getNom(), Validators.required),
      prenom: this.formBuilder.control(client.getPrenom()),
    });
    this.modificationTelephoneGroup = this.formBuilder.group({
      telephones: this.formBuilder.array([])
    });
    this.modificationAdresseGroup = this.formBuilder.group({
      lot       : this.formBuilder.control(client.getAdresse().getLot()),
      codePostal: this.formBuilder.control(client.getAdresse().getCodePostal(), Validators.required),
      ville     : this.formBuilder.control(client.getAdresse().getVille(), Validators.required),
    });

    this.childStates = {
      titreEtape: 'Information personnel',
      etatEtape : new ClientSteps(),
      rangEtape : 0
    };
    this.childStates.rangEtape = this.childStates.etatEtape.informationPersonnel;

    for (const telephone of client.getTelephones()) {
      this.addTelephonesModification(telephone);
    }
  }

  getTelephonesModification(): FormArray {
    return this.modificationTelephoneGroup.controls.telephones as FormArray;
  }

  addTelephonesModification(numero: string): void {
    const validators = [Validators.required, Validators.pattern('(03){1}[1-9]{1}[0-9]{7}')];
    this.getTelephonesModification().push(this.formBuilder.control(numero, validators));
  }

  initialiserEvenementGeneral(): void {
    document.addEventListener('reloadList', event => {
      this.clientService.select();
    });
  }

  initialiserFormulairePhoto(states: any): void {
    this.statePhoto = {
      client        : states.id,
      ancienPhoto   : states.photos,
      nomDuFichier  : 'Choisir un photo',
      dropZoneActive: false,
      editMode      : false,
      url           : this.url
    };
    this.scriptLoader.append(this.photoScript);
    this.scriptLoader.reload();
  }

  fermerModals(statusSucces: boolean): void {
    if (statusSucces) {
      document.querySelectorAll('.modal').forEach(element => element.dispatchEvent(new Event('closeModal')));
      this.paginationParameter.setLimit(this.paginationHelper.getDebutVue());
      this.paginationService.paginer(this.paginationParameter);
    }
  }

  paginationFormAction(): void {
    this.paginationParameter.setOffset(parseInt((this.paginationForm.value.elementForEachPage.toString() !== 'custom' ? this.paginationForm.value.elementForEachPage : this.paginationForm.value.customElementForEachPage).toString(), 10));
    this.paginationParameter.setOrdered(true);
    this.paginationParameter.setOrderDirection(this.paginationForm.value.sortDirection);
    this.paginationParameter.setOrderField(this.paginationForm.value.sortConstraint);
    this.paginationParameter.setSearchActive(this.paginationForm.value.keywordSearch.length > 0);
    this.paginationParameter.setSearchField(this.paginationForm.value.searchField);
    this.paginationParameter.setKeywordSearch(this.paginationForm.value.keywordSearch);
    this.paginationHelper.setOffset(this.paginationParameter.getOffset());
    this.boutonPages = this.paginationHelper.getPages();
    this.reloadView();
    this.initPaginationForm();
  }

  resetModule(): void {
    this.paginationForm.patchValue({module: ''});
  }

  ngOnDestroy(): void {
    this.scriptLoader.destroy();
    this.clientPaginationSubscription.unsubscribe();
  }
}
