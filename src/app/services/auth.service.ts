import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  serverConfig: any = environment.serverConfig;
  base = this.serverConfig.host + this.serverConfig.port;

  constructor(private _http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.base + '/api/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.base + '/api/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.base + '/api/users/profile', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  getOrders() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.base + '/api/orders', { headers: headers })
      .map(res => res.json());
  }

  getOrder(id: string) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.base + '/api/order-details/' + id, { headers: headers })
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this._http.delete(this.base + '/api/order/' + id)
      .map(res => res.json());
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
