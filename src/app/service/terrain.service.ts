import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../utils/urls';
import { Terrain } from '../entity/terrain';
import { VenteConstraint } from '../classes/vente-constraint';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private url: string;
  private terrains: Terrain[];
  public subject: Subject<Terrain[]>;

  constructor(private requete: HttpClient) {
    this.url = new Urls().getBackendUrl();
    this.terrains = [];
    this.subject = new Subject<Terrain[]>();
    console.log('initiation:', this.terrains);
  }

  emit(): TerrainService {
    this.subject.next(this.terrains.slice());
    console.log('emiting:', this.terrains);
    return this;
  }

  select(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.requete.get<Terrain[]>(this.url + 'terrain/list.action').subscribe((terrains: Terrain[]) => {
        this.terrains = terrains === null ? [] : terrains.map(terrain => new Terrain(terrain));
        this.emit();
        resolve(true);
      });
    });
  }

  selectEnVente(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.requete.get<Terrain[]>(this.url + 'terrain/list-en-vente.action').subscribe((terrains: Terrain[]) => {
        this.terrains = terrains === null ? [] : terrains.map(terrain => new Terrain(terrain));
        this.emit();
        resolve(true);
      })
    });
  }

  selectCritereVente(venteConstraint: VenteConstraint): Promise<boolean> {
    const formData = new FormData();
    formData.append('venteConstraint.localisation', venteConstraint.getLocalisation());
    formData.append('venteConstraint.surfaceConstraint', venteConstraint.getSurfaceConstraint());
    formData.append('venteConstraint.budgetConstraint', venteConstraint.getBudgetConstraint());
    formData.append('venteConstraint.relief', venteConstraint.getRelief());
    formData.append('venteConstraint.surface', venteConstraint.getSurface().toString());
    formData.append('venteConstraint.budget', venteConstraint.getBudget().toString());
    return new Promise<boolean>(resolve => {
      this.requete.post<Terrain[]>(this.url + 'terrain/list-vente-selection.action', formData).subscribe((terrains: Terrain[]) => {
        this.terrains = terrains === null ? [] : terrains.map(terrain => new Terrain(terrain));
        this.emit();
        resolve(true);
      })
    });
  }

  insert(terrain: Terrain): Promise<boolean> {
    return new Promise<boolean>((resolve => {
      this.requete.post(this.url + 'terrain/insert.action', terrain).subscribe(() => {
        resolve(true);
      });
    }));
  }

  update(terrain: Terrain): Promise<any> {
    return new Promise<boolean>((resolve => {
      this.requete.post<any>(this.url + 'terrain/update.action', terrain).subscribe((response) => {
        resolve(response);
      });
    }));
  }

  delete(id: number): Promise<any> {
    return new Promise<any>((resolve => {
      this.requete.get<any>(this.url + 'terrain/delete.action?id=' + id).subscribe((response) => {
        resolve(response);
      });
    }));
  }
}
