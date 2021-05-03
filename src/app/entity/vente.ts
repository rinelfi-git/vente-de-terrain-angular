import {Terrain} from './terrain';
import {Client} from './client';

export class Vente {
  id: number;
  operation: Date;
  terrain: Terrain;
  client: Client;

  constructor(object?: any) {
    this.id = object && object.id;
    this.operation = object && object.operation;
    this.terrain = object && new Terrain(object.terrain);
    this.client = object && new Client(object.client);
  }

  setId(id: number): Vente {
    this.id = id;
    return this;
  }

  setOperation(operation: Date): Vente {
    this.operation = operation;
    return this;
  }

  setTerrain(terrain: Terrain): Vente {
    this.terrain = terrain;
    return this;
  }

  setClient(client: Client): Vente {
    this.client = client;
    return this;
  }

  getId(): number {
    return this.id;
  }

  getOperation(): Date {
    return this.operation;
  }

  getTerrain(): Terrain {
    return this.terrain;
  }

  getClient(): Client {
    return this.client;
  }
}
