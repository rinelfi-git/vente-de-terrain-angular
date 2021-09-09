export class TokenPayload {
  private nomUtilisateur: string;
  private email: string;
  private photo: string;

  constructor(object?: any) {
    this.nomUtilisateur = object && object.nomUtilisateur;
    this.email = object && object.email;
    this.photo = object && object.photo;
  }

  getNomUtilisateur(): string {
    return this.nomUtilisateur;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoto(): string {
    return this.photo;
  }

  setNomUtilisateur(nomUtilisateur: string): void {
    this.nomUtilisateur = nomUtilisateur;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhoto(photo: string): void {
    this.photo = photo;
  }
}
