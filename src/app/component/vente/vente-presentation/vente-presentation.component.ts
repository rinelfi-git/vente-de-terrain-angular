import {Component, OnDestroy, OnInit} from '@angular/core';
import {Terrain} from '../../../entity/terrain';
import {Subscription} from 'rxjs';
import {Urls} from '../../../utils/urls';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TerrainService} from '../../../service/terrain.service';
import {VenteConstraint} from '../../../classes/vente-constraint';

@Component({
  selector   : 'app-vente-presentation',
  templateUrl: './vente-presentation.component.html',
  styleUrls  : ['./vente-presentation.component.scss'],
  providers  : [TerrainService]
})
export class VentePresentationComponent implements OnInit, OnDestroy {
  
  terrains: Terrain[];
  terrainSubscription: Subscription;
  terrainHost: string;
  url: string;
  criteriaForm: FormGroup;
  
  activeBudget: boolean;
  activeSurface: boolean;
  
  constructor(private formBuilder: FormBuilder, private title: Title, private terrainService: TerrainService) {
    this.terrains = [];
    this.terrainSubscription = new Subscription();
    this.url = '';
    this.terrainHost = '';
    this.criteriaForm = this.initCriteriaForm();
    this.activeBudget = false;
    this.activeSurface = false;
  }
  
  ngOnInit(): void {
    this.title.setTitle('gestion des ventes');
    this.url = new Urls().getBackendUrl();
    this.terrainHost = new Urls().getTerrainServerUrl();
    this.initCriteriaForm();
    this.terrainSubscription = this.terrainService.subject.subscribe((terrains: Terrain[]) => this.terrains = terrains);
    this.terrainService.emit();
    this.activeBudget = false;
    this.activeSurface = false;
  }
  
  initCriteriaForm(): FormGroup {
    return this.criteriaForm = this.formBuilder.group({
      localisation     : this.formBuilder.control(''),
      surface          : this.formBuilder.control(0),
      contrainteSurface: this.formBuilder.control('not'),
      budget           : this.formBuilder.control(0),
      contrainteBudget : this.formBuilder.control('not'),
      relief           : this.formBuilder.control('*')
    });
  }
  
  criteriaAction(): void {
    this.updateActiveContrainteBudget();
    this.updateActiveContrainteSurface();
    const venteConstraint = new VenteConstraint();
    venteConstraint.setBudget(parseInt(this.criteriaForm.value.budget, 10));
    venteConstraint.setBudgetConstraint(this.criteriaForm.value.contrainteBudget);
    venteConstraint.setLocalisation(this.criteriaForm.value.localisation);
    venteConstraint.setSurface(parseInt(this.criteriaForm.value.surface, 10));
    venteConstraint.setSurfaceConstraint(this.criteriaForm.value.contrainteSurface);
    venteConstraint.setRelief(this.criteriaForm.value.relief);
    this.terrainService.selectCritereVente(venteConstraint);
  }
  
  updateActiveContrainteBudget(): void {
    this.activeBudget = this.criteriaForm.value.contrainteBudget.toString() !== '3';
  }
  
  updateActiveContrainteSurface(): void {
    this.activeSurface = this.criteriaForm.value.contrainteSurface.toString() !== '3';
  }
  
  updateList(): void {
    this.terrainService.select();
  }
  
  ngOnDestroy(): void {
    this.terrainSubscription.unsubscribe();
  }
}
