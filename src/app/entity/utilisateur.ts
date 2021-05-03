export class Utilisateur {
  nomUtilisateur: string;
  email: string;
  motDePasse: string;
  photo: string;

  constructor(object?: any) {
    this.nomUtilisateur = object && object.nomUtilisateur;
    this.email = object && object.email;
    this.motDePasse = object && object.motDePasse;
    this.photo = object && object.photo;
  }

  setNomUtilisateur(nomUtilisateur: string): Utilisateur {
    this.nomUtilisateur = nomUtilisateur;
    return this;
  }

  setAdresseMail(adresseMail: string): Utilisateur {
    this.email = adresseMail;
    return this;
  }

  setMotDePasse(motDePasse: string): Utilisateur {
    this.motDePasse = motDePasse;
    return this;
  }

  setPhoto(photo: string): Utilisateur {
    this.photo = photo;
    return this;
  }

  getNomUtilisateur(): string {
    return this.nomUtilisateur;
  }

  getAdresseMail(): string {
    return this.email;
  }

  getMotDePasse(): string {
    return this.motDePasse;
  }

  getPhoto(): string {
    return this.photo;
  }
}
