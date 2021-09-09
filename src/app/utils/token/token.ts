import {TokenHeader} from './token-header';
import {TokenPayload} from './token-payload';

export class Token {
  private header: TokenHeader;
  private payload: TokenPayload;

  constructor(object?: any) {
    this.header = object && new TokenHeader(object.header);
    this.payload = object && new TokenPayload(object.payload);
  }

  getHeader(): TokenHeader {
    return this.header;
  }

  getPayload(): TokenPayload {
    return this.payload;
  }

  setHeader(header: TokenHeader): void {
    this.header = header;
  }

  setPayload(payload: TokenPayload): void {
    this.payload = payload;
  }
}
