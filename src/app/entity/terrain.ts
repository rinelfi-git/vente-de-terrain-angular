import {Client} from './client';

export class Terrain {
  private id: number;
  private proprietaire: Client;
  private enVente: boolean;
  private localisation: string;
  private surface: number;
  private prixParMetreCarre: number;
  private relief: string;
  private apercues: string[];

  constructor(object?: any) {
    this.id = object && object.id;
    this.proprietaire = object && new Client(object.proprietaire);
    this.enVente = object && object.enVente;
    this.localisation = object && object.localisation;
    this.surface = object && object.surface;
    this.prixParMetreCarre = object && object.prixParMetreCarre;
    this.relief = object && object.relief;
    this.apercues = object && object.apercues || [];
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): Terrain {
    this.id = value;
    return this;
  }

  getApercues(): string[] {
    return this.apercues;
  }

  setApercues(value: string[]): Terrain {
    this.apercues = value;
    return this;
  }

  isEnVente(): boolean {
    return this.enVente;
  }

  setEnVente(enVente: boolean): Terrain {
    this.enVente = enVente;
    return this;
  }

  getLocalisation(): string {
    return this.localisation;
  }

  setLocalisation(value: string): Terrain {
    this.localisation = value;
    return this;
  }

  getProprietaire(): Client {
    return this.proprietaire;
  }

  setProprietaire(value: Client): Terrain {
    this.proprietaire = value;
    return this;
  }

  getSurface(): number {
    return this.surface;
  }

  setSurface(value: number): Terrain {
    this.surface = value;
    return this;
  }

  getPrixParMetreCarre(): number {
    return this.prixParMetreCarre;
  }

  setPrixParMetreCarre(prixParMetreCarre: number): Terrain {
    this.prixParMetreCarre = prixParMetreCarre;
    return this;
  }

  getRelief(): string {
    return this.relief;
  }

  setRelief(value: string): Terrain {
    this.relief = value;
    return this;
  }
}
