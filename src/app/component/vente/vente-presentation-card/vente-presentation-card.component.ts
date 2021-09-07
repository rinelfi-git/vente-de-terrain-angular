import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Terrain} from '../../../entity/terrain';
import {Client} from '../../../entity/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../utils/urls';
import {Files} from '../../../utils/files';
import {ClientService} from '../../../service/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector   : 'app-vente-presentation-card',
  templateUrl: './vente-presentation-card.component.html',
  styleUrls  : ['./vente-presentation-card.component.scss']
})
export class VentePresentationCardComponent implements OnInit, OnDestroy {

  @Input() terrain: Terrain;
  @Input() componentIndex: number;
  @Output() update: EventEmitter<void>;
  states: any;

  // choix d'utilisateur
  clientSubscription: Subscription;
  clients: Client[];
  clientsView: Client[];
  searchClientActive: boolean;
  sellForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.componentIndex = -1;
    this.terrain = new Terrain();
    this.clients = [];
    this.clientsView = [];
    this.searchClientActive = false;
    this.sellForm = this.initSellForm();
    this.clientSubscription = new Subscription();
    this.update = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.initSellForm();
    const url = new Urls();
    this.states = {
      terrainHost   : url.getTerrainServerUrl(),
      defaultPreview: url.getTerrainServerUrl() + Files.DEFAULT_FIELD
    };
    this.clientSubscription = this.clientService.subject.subscribe(clients => {
      this.clients = clients.slice();
      this.clientsView = clients.slice();
    });
    this.clientService.emit().select();
  }

  initSellForm(): FormGroup {
    return this.sellForm = this.formBuilder.group({
      clientSearch: this.formBuilder.control(''),
      client      : this.formBuilder.control('', Validators.required)
    });
  }

  venteAction(done: boolean): void {
    if (done) {
      this.update.emit();
    }
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }
}
