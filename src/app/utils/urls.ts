export class Urls {
  private BACK_END_PROTOCOL = 'http://';
  private BACK_END_SERVER_HOST = 'localhost';
  private BACK_END_SERVER_PORT = 8080;
  private BACK_END_NAMESPACE = '/vente-de-terrain/';

  private IMAGE_SERVER_PROTOCOL = 'http://';
  private IMAGE_SERVER_HOST = 'localhost';
  private IMAGE_SERVER_PORT = 80;
  private PROFILE_SERVER_NAMESPACE = '/vente-de-terrain/images/clients/';
  private FIELD_SERVER_NAMESPACE = '/vente-de-terrain/images/terrains/';

  getBackendUrl(): string {
    return this.BACK_END_PROTOCOL + this.BACK_END_SERVER_HOST + ':' + this.BACK_END_SERVER_PORT + this.BACK_END_NAMESPACE;
  }

  getProfileServerUrl(): string {
    return this.IMAGE_SERVER_PROTOCOL + this.IMAGE_SERVER_HOST + ':' + this.IMAGE_SERVER_PORT + this.PROFILE_SERVER_NAMESPACE;
  }

  getTerrainServerUrl(): string {
    return this.IMAGE_SERVER_PROTOCOL + this.IMAGE_SERVER_HOST + ':' + this.IMAGE_SERVER_PORT + this.FIELD_SERVER_NAMESPACE;
  }
}
