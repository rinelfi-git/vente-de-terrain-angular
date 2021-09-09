import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Terrain} from '../../../entity/terrain';
import {Client} from '../../../entity/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../utils/urls';
import {Files} from '../../../utils/files';
import {TerrainService} from '../../../service/terrain.service';

@Component({
  selector   : 'app-terrain-presentation-card',
  templateUrl: './terrain-presentation-card.component.html',
  styleUrls  : ['./terrain-presentation-card.component.scss']
})
export class TerrainPresentationCardComponent implements OnInit {
  @Input() componentIndex: number;
  @Input() terrain: Terrain;
  @Input() clients: Client[];
  @Input() states: any;
  @Output() update: EventEmitter<void>;

  childStates: any;
  updateTerrain: Terrain;
  updateClients: Client[];
  updateClientsView: Client[];
  updateForm: FormGroup;
  updateSearchClientActive: boolean;

  updateBackgrounds: string[];
  updateTemporaries: string[];
  updateForTrash: string[];

  constructor(private formBuilder: FormBuilder, private terrainService: TerrainService) {
    this.componentIndex = -1;
    this.terrain = new Terrain();
    this.updateTerrain = new Terrain();
    this.clients = [];
    this.updateClients = [];
    this.updateClientsView = [];
    this.updateForm = this.initUpdateForm();
    this.updateSearchClientActive = false;
    this.updateBackgrounds = [];
    this.updateTemporaries = [];
    this.updateForTrash = [];
    this.update = new EventEmitter<void>();
  }

  ngOnInit(): void {
    const urls = new Urls();
    this.states = {
      defaultPreview: urls.getTerrainServerUrl() + Files.DEFAULT_FIELD,
      terrainHost   : urls.getTerrainServerUrl()
    };
  }

  initUpdateForm(): FormGroup {
    this.updateTerrain = new Terrain(this.terrain);
    this.updateClients = this.clients.slice();
    this.updateClientsView = this.clients.slice();
    this.updateSearchClientActive = false;
    return this.updateForm = this.formBuilder.group({
      localisation         : this.formBuilder.control(this.terrain.getLocalisation(), Validators.required),
      rechercheProprietaire: this.formBuilder.control(''),
      proprietaire         : this.formBuilder.control(this.terrain.getProprietaire() && this.terrain.getProprietaire().getId(), Validators.required),
      surface              : this.formBuilder.control(this.terrain.getSurface(), Validators.required),
      prixParMetreCarre    : this.formBuilder.control(this.terrain.getPrixParMetreCarre(), Validators.required),
      relief               : this.formBuilder.control(this.terrain.getRelief(), Validators.required),
      enVente              : this.formBuilder.control(this.terrain.isEnVente())
    });
  }

  initUploadForm(): void {
    this.childStates = {
      terrain    : this.terrain.getId(),
      terrainHost: this.states.terrainHost
    };
    this.updateBackgrounds = this.terrain.getApercues().slice();
    this.updateForTrash = [];
    this.updateTemporaries = [];
  }

  uploadPhotoAction(done: boolean): void {
    const modal = document.getElementById('modifier-apercu' + this.componentIndex);
    if (modal && done) {
      modal.dispatchEvent(new Event('hide'));
      this.update.emit();
    }
  }

  updateAction(done: boolean): void {
    const modal = document.getElementById('modification-modal' + this.componentIndex);
    if (modal && done) {
      modal.dispatchEvent(new Event('hide'));
      this.update.emit();
    }
  }

  delete(): void {
    this.terrainService.delete(this.terrain.getId()).then(response => {
      if (response.status) {
        this.update.emit();
      }
    });
  }
}
