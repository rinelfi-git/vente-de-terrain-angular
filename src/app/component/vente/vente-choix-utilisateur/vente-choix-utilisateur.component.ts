import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../entity/client';
import {Terrain} from '../../../entity/terrain';
import {Vente} from '../../../entity/vente';
import {VenteService} from '../../../service/vente.service';

@Component({
  selector   : 'app-vente-choix-utilisateur',
  templateUrl: './vente-choix-utilisateur.component.html',
  styleUrls  : ['./vente-choix-utilisateur.component.scss']
})
export class VenteChoixUtilisateurComponent implements OnInit {

  @Input() componentIndex: number;
  @Input() clientSearchActive: boolean;
  @Input() sellForm: FormGroup;
  @Input() clients: Client[];
  @Input() clientsView: Client[];
  @Input() terrain: Terrain;
  @Output() venteDone: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder, private venteService: VenteService) {
    this.componentIndex = 0;
    this.clientSearchActive = false;
    this.clients = [];
    this.clientsView = [];
    this.sellForm = this.initSellForm();
    this.terrain = new Terrain();
    this.venteDone = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.initSellForm();
  }

  initSellForm(): FormGroup {
    return this.sellForm = this.formBuilder.group({
      clientSearch: this.formBuilder.control(''),
      client      : this.formBuilder.control('', Validators.required)
    });
  }


  saveAction(): void {
    const vente = new Vente();
    vente.setClient(new Client(this.clients.find(client => this.sellForm.value.client.toString() === client.getId().toString())));
    vente.setTerrain(this.terrain);
    const modal = document.getElementById('choix-utilisateur' + this.componentIndex);
    this.venteService.insert(vente).then(response => {
      if (response.status && modal) {
        this.venteDone.emit(true);
        // @ts-ignore
        $(modal).modal('hide');
      }
    });
  }

  filterClient(): void {
    const temporaryClient: Client[] = [];
    const regex = new RegExp('(' + this.sellForm.value.clientSearch.toString().toLowerCase() + '){1,}');
    if (this.sellForm.value.clientSearch.toString() !== '') {
      this.clients.forEach((client: Client) => {
        if (client.getNom().toLowerCase().match(regex) || client.getPrenom().toLowerCase().match(regex)) {
          temporaryClient.push(client);
        }
      });
      this.clientsView = temporaryClient.slice().map(client => new Client(client));
    } else {
      this.clientsView = this.clients.slice().map(client => new Client(client));
    }

    // reassignation de l'ancien valeur séléctionnée
    let ancienValeurPresent = false;
    this.clientsView.forEach(client => {
      if (this.sellForm.value.client.toString() === client.getId()) {
        ancienValeurPresent = true;
      }
    });
    if (ancienValeurPresent) {
      this.sellForm.patchValue({client: this.sellForm.value.client});
    } else {
      this.sellForm.patchValue({client: ''});
    }
  }

  getFormatedSurface(): string {
    return this.terrain.getSurface().toLocaleString('fr-fr', {maximumFractionDigits: 2});
  }

  getFormatedPrix(): string {
    return (this.terrain.getSurface() * this.terrain.getPrixParMetreCarre()).toLocaleString('fr-fr', {maximumFractionDigits: 2});
  }

  switchClientInputSearchShow(): void {
    this.clientSearchActive = !this.clientSearchActive;
  }
}
