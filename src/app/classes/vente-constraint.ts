export class VenteConstraint {
  private localisation: string;
  private surface: number;
  private surfaceConstraint: string;
  private budget: number;
  private budgetConstraint: string;
  private relief: string;

  constructor(object?: any) {
    this.localisation = object && object.localisation;
    this.surface = object && object.surface;
    this.surfaceConstraint = object && object.surfaceConstraint;
    this.budget = object && object.budget;
    this.budgetConstraint = object && object.budgetConstraint;
    this.relief = object && object.relief;
  }

  getLocalisation(): string {
    return this.localisation;
  }

  getSurface(): number {
    return this.surface;
  }

  getSurfaceConstraint(): string {
    return this.surfaceConstraint;
  }

  getBudget(): number {
    return this.budget;
  }

  getBudgetConstraint(): string {
    return this.budgetConstraint;
  }

  getRelief(): string {
    return this.relief;
  }

  setLocalisation(localisation: string): VenteConstraint {
    this.localisation = localisation;
    return this;
  }

  setSurface(surface: number): VenteConstraint {
    this.surface = surface;
    return this;
  }

  setSurfaceConstraint(surfaceConstraint: string): VenteConstraint {
    this.surfaceConstraint = surfaceConstraint;
    return this;
  }

  setBudget(budget: number): VenteConstraint {
    this.budget = budget;
    return this;
  }

  setBudgetConstraint(budgetConstraint: string): VenteConstraint {
    this.budgetConstraint = budgetConstraint;
    return this;
  }

  setRelief(relief: string): VenteConstraint {
    this.relief = relief;
    return this;
  }
}
