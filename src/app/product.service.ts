import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get('http://localhost:3000/products')
      .map(res => res.json());
  }

}
