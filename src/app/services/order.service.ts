import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

@Injectable()
export class OrderService {
  serverConfig: any = environment.serverConfig;
  base = this.serverConfig.host + this.serverConfig.port;

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) { }

  getOrders() {
    const headers = new Headers();
    this._authService.loadToken();
    headers.append('Authorization', this._authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.base + '/api/orders', { headers: headers })
      .map(res => res.json());
  }

  getOrder(id: string) {
    return this._http.get(this.base + '/api/order-details/' + id)
      .map(res => res.json());
  }

  getOrdersByPhone(value) {
    const headers = new Headers();
    this._authService.loadToken();
    headers.append('Authorization', this._authService.authToken);
    headers.append('Content-Type', 'application/json');
    const phone = value.phone;
    return this._http.get(this.base + '/api/ordersByPhone/' + phone)
      .map(res => res.json());
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

  finishOrder(id) {
    return this._http.put(this.base + '/api/order/' + id, { status: 'done' })
      .map(res => res.json());
  }

}
