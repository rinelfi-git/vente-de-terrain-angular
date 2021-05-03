export class TokenHeader {
  private dateExpiration: number;
  private dureeSession: number;

  constructor(object?: any) {
    this.dateExpiration = object && object.dateExpiration;
    this.dureeSession = object && object.dureeSession;
  }

  getDateExpiration(): number {
    return this.dateExpiration;
  }

  setDateExpiration(dateExpiration: number): void {
    this.dateExpiration = dateExpiration;
  }

  getDureeSession(): number {
    return this.dureeSession;
  }

  setDureeSession(dureeSession: number): void {
    this.dureeSession = dureeSession;
  }
}
