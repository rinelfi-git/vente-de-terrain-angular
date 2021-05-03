import {Adresse} from './adresse';

export class Client {
  private id: number;
  private cin: string;
  private nom: string;
  private prenom: string;
  private photo: string;
  private adresse: Adresse;
  private telephones: string[];

  constructor(object?: any) {
    this.id = object && object.id;
    this.cin = object && object.cin;
    this.nom = object && object.nom;
    this.prenom = object && object.prenom;
    this.photo = object && object.photo;
    this.adresse = object && new Adresse(object.adresse);
    this.telephones = object && object.telephones || [];
  }

  setId(id: number): Client {
    this.id = id;
    return this;
  }

  getId(): number {
    return this.id;
  }

  setCin(cin: string): Client {
    this.cin = cin;
    return this;
  }

  setPhoto(photo: string): Client {
    this.photo = photo;
    return this;
  }

  setNom(nom: string): Client {
    this.nom = nom;
    return this;
  }

  setPrenom(prenom: string): Client {
    this.prenom = prenom;
    return this;
  }

  setAdresse(adresse: Adresse): Client {
    this.adresse = adresse;
    return this;
  }

  setTelephone(telephone: string[]): Client {
    this.telephones = telephone;
    return this;
  }


  getCin(): string {
    return this.cin;
  }

  getPhoto(): string {
    return this.photo;
  }

  getNom(): string {
    return this.nom;
  }

  getPrenom(): string {
    return this.prenom;
  }

  getAdresse(): Adresse {
    return this.adresse;
  }

  getTelephones(): string[] {
    return this.telephones;
  }
}
