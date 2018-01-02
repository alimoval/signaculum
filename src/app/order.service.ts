import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private _http: Http) { }

  getOrders() {
    return this._http.get('http://localhost:3000/api/orders')
      .map(res => res.json());
  }


  addOrder(newOrder) {
    const headers = new Headers();
    console.log('data in order.service: \n' + newOrder);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post('http://localhost:3000/api/order', JSON.stringify(newOrder), { headers: headers })
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this._http.delete('http://localhost:3000/api/order/' + id)
      .map(res => res.json());
  }

}
