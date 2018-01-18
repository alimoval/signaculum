import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Product } from '../Product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get('http://localhost:3000/products')
      .map(res => res.json() as Product[]);
  }

  getProduct(id: string) {
    return this._http.get('http://localhost:3000/order-form/' + id)
      .map(res => res.json() as Product);
  }

}
