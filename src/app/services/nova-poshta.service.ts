import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class NovaPoshtaService {

    private _apiKey = '1445995d7b4ff4275235065b3bd1c721';
    private _novaPoshtaApiUrl = 'https://api.novaposhta.ua/v2.0/json/';

    constructor(private _http: Http) { }

    // Get All Nova Poshta Cities;
    getCities() {
        const body = {
            'modelName': 'Address',
            'calledMethod': 'getCities',
            'methodProperties': {
                'Ref': ''
            },
            'apiKey': this._apiKey
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._novaPoshtaApiUrl, body, { headers: headers })
            .map(response => response.json());
    }

    // Get Order City
    getCity(ref) {
        const body = {
            'modelName': 'Address',
            'calledMethod': 'getCities',
            'methodProperties': {
                'Ref': ref
            },
            'apiKey': this._apiKey
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._novaPoshtaApiUrl, body, { headers: headers })
            .map(response => response.json());
    }

    // Get Nova Poshta Warehouses In Selected City
    getWarehouses(cityRef) {
        const body = {
            'modelName': 'AddressGeneral',
            'calledMethod': 'getWarehouses',
            'methodProperties': {
                'CityRef': cityRef
            },
            'apiKey': this._apiKey
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._novaPoshtaApiUrl, body, { headers: headers })
            .map(response => response.json());
    }
}
