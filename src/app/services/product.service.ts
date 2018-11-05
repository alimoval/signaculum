import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response } from '@angular/http';
import { Product } from '../../Product';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  serverConfig: any = environment.serverConfig;
  foo = this.serverConfig.host + this.serverConfig.port;

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get(this.foo + '/api/products')
      .map(res => res.json() as Product[]);
  }

  getProduct(id: string) {
    return this._http.get(this.foo + '/api/order-form/' + id)
      .map(res => res.json() as Product);
  }

}
