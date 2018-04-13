import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Order } from '../../Order';

import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private _http: Http) { }

  getOrders() {
    return this._http.get('http://localhost:3000/api/orders')
      .map(res => res.json());
  }

  getOrder(id: string) {
    return this._http.get('http://localhost:3000/api/order-details/' + id)
      .map(res => res.json() as Order);
  }

  addOrder(newOrder) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/order', newOrder, { headers: headers })
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this._http.delete('http://localhost:3000/api/order/' + id)
      .map(res => res.json());
  }

}
