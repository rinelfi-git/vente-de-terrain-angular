export class Adresse {
  private ville: string;
  private codePostal: number;
  private lot: string;

  constructor(object?: any) {
    this.ville = object && object.ville;
    this.codePostal = object && object.codePostal;
    this.lot = object && object.lot;
  }

  getVille(): string {
    return this.ville;
  }

  setVille(value: string): Adresse {
    this.ville = value;
    return this;
  }

  getCodePostal(): number {
    return this.codePostal;
  }

  setCodePostal(value: number): Adresse {
    this.codePostal = value;
    return this;
  }

  getLot(): string {
    return this.lot;
  }

  setLot(value: string): Adresse {
    this.lot = value;
    return this;
  }
}
