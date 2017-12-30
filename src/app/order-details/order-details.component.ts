import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { OrderService } from '../order.service';
import { Order } from '../../Order';
import { ProductService } from '../product.service';
import { Product } from '../../Product';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public product = <any>{};
  public sizeFlag: string;
  public outdoor: string;

  constructor(
    private _orderService: OrderService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
  ) {
    console.log('Product and Order Services Initialized');
  }

  getProduct() {
    this._route.params
      .switchMap((params: Params) => this._productService.getProduct(params['id']))
      .subscribe(product => {
        console.log(product);
        this.product = product;
        // this.sizeFlag = this.product.sizeFlag;
        // this.outdoor = this.product.outdoor;
        // this.createForm(this.product);
        // this.priceCalculate();
      });
  }

  ngOnInit() {
    this.getProduct();
  }

}
