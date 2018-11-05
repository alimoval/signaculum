import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { Order } from '../../Order';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
  serverConfig: any = environment.serverConfig;
  base = this.serverConfig.host + this.serverConfig.port;

  constructor(private _http: Http) { }

  getOrders() {
    return this._http.get(this.base + '/api/orders')
      .map(res => res.json());
  }

  getOrder(id: string) {
    return this._http.get(this.base + '/api/order-details/' + id)
      .map(res => res.json() as Order);
  }

  addOrder(newOrder) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.base + '/api/order', newOrder, { headers: headers })
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this._http.delete(this.base + '/api/order/' + id)
      .map(res => res.json());
  }

}
