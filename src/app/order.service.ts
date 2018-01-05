import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private _http: Http) { }

  getOrders() {
    return this._http.get('api/orders')
      .map(res => res.json());
  }

  addOrder(newOrder) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('api/order', newOrder, { headers: headers })
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this._http.delete('api/order/' + id)
      .map(res => res.json());
  }

}
