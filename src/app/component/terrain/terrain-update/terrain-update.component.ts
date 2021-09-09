import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Terrain} from '../../../entity/terrain';
import {Client} from '../../../entity/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TerrainService} from '../../../service/terrain.service';

@Component({
  selector   : 'app-terrain-update',
  templateUrl: './terrain-update.component.html',
  styleUrls  : ['./terrain-update.component.scss']
})
export class TerrainUpdateComponent implements OnInit {

  @Input() componentIndex: number;
  @Input() states: any;
  @Input() terrain: Terrain;
  @Input() clients: Client[];
  @Input() clientsView: Client[];
  @Input() updateForm: FormGroup;
  @Input() clientSearchActive: boolean;
  @Output() updateDone: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder, private terrainService: TerrainService) {
    this.componentIndex = -1;
    this.terrain = new Terrain();
    this.clients = [];
    this.clientsView = [];
    this.updateForm = this.initUpdateForm();
    this.clientSearchActive = false;
    this.updateDone = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  initUpdateForm(): FormGroup {
    return this.updateForm = this.formBuilder.group({
      localisation         : this.formBuilder.control('', Validators.required),
      rechercheProprietaire: this.formBuilder.control(''),
      proprietaire         : this.formBuilder.control('', Validators.required),
      surface              : this.formBuilder.control('', Validators.required),
      prixParMetreCarre    : this.formBuilder.control('', Validators.required),
      relief               : this.formBuilder.control('', Validators.required),
      enVente              : this.formBuilder.control(false)
    });
  }

  submitAction(): void {
    this.terrain.setLocalisation(this.updateForm.value.localisation);
    const client = this.clients.find(clientCollect => this.updateForm.value.proprietaire.toString() === clientCollect.getId().toString());
    this.terrain.setProprietaire(new Client(client));
    this.terrain.setSurface(this.updateForm.value.surface);
    this.terrain.setPrixParMetreCarre(this.updateForm.value.prixParMetreCarre);
    this.terrain.setRelief(this.updateForm.value.relief);
    this.terrain.setEnVente(this.updateForm.value.enVente);
    this.terrainService.update(this.terrain).then(response => {
      if (response.status) {
        this.updateDone.emit(response.status);
      }
    });
  }

  filterClient(): void {
    const temporaryClient: Client[] = [];
    const regex = new RegExp('(' + this.updateForm.value.rechercheProprietaire.toString().toLowerCase() + '){1,}');
    if (this.updateForm.value.rechercheProprietaire.toString() !== '') {
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
      if (this.updateForm.value.proprietaire.toString() === client.getId().toString()) {
        ancienValeurPresent = true;
      }
    });
    if (ancienValeurPresent) {
      this.updateForm.patchValue({proprietaire: this.updateForm.value.proprietaire});
    } else {
      this.updateForm.patchValue({proprietaire: ''});
    }
  }

  switchClientInputSearchShow(): void {
    this.clientSearchActive = !this.clientSearchActive;
  }
}
