import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from '../../../entity/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Terrain} from '../../../entity/terrain';
import {TerrainService} from '../../../service/terrain.service';

@Component({
  selector   : 'app-terrain-insert',
  templateUrl: './terrain-insert.component.html',
  styleUrls  : ['./terrain-insert.component.scss']
})
export class TerrainInsertComponent implements OnInit {
  @Input() clients: Client[] = [];
  @Input() clientsView: Client[] = [];
  @Input() insertForm: FormGroup;
  @Input() clientSearchActive: boolean;
  @Output() insertDone: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder, private terrainService: TerrainService) {
    this.insertForm = this.initInsertForm();
    this.insertDone = new EventEmitter<boolean>();
    this.clientSearchActive = false;
  }

  ngOnInit(): void {
    this.initInsertForm();
  }

  initInsertForm(): FormGroup {
    return this.insertForm = this.formBuilder.group({
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
    const terrain = new Terrain();
    const proprietaire = this.clients.find(client => client.getId().toString() === this.insertForm.value.proprietaire.toString()) as Client;
    terrain.setProprietaire(proprietaire);
    terrain.setLocalisation(this.insertForm.value.localisation);
    terrain.setPrixParMetreCarre(this.insertForm.value.prixParMetreCarre);
    terrain.setRelief(this.insertForm.value.relief);
    terrain.setSurface(this.insertForm.value.surface);
    terrain.setEnVente(this.insertForm.value.enVente);
    this.terrainService.insert(terrain).then(() => {
      this.insertDone.emit(true);
    }).catch(error => console.log(error));
  }

  filterClient(): void {
    const temporaryClient: Client[] = [];
    const regex = new RegExp('(' + this.insertForm.value.rechercheProprietaire.toString().toLowerCase() + '){1,}');
    if (this.insertForm.value.rechercheProprietaire.toString() !== '') {
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
      if (this.insertForm.value.proprietaire.toString() === client.getId().toString()) {
        ancienValeurPresent = true;
      }
    });
    if (ancienValeurPresent) {
      this.insertForm.patchValue({proprietaire: this.insertForm.value.proprietaire});
    } else {
      this.insertForm.patchValue({proprietaire: ''});
    }
  }

  switchClientInputSearchShow(): void {
    this.clientSearchActive = !this.clientSearchActive;
  }

}
