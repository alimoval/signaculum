import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { OrderService } from '../order.service';
import { Order } from '../../Order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public order: Order;
  public router: Router;

  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.router = _router;
  }

  getOrder() {
    this._route.params
      .switchMap((params: Params) => this._orderService.getOrder(params['id']))
      .subscribe(order => {
        this.order = order;
      });
  }

  deleteOrder(id) {
    this._orderService.deleteOrder(id)
      .subscribe(data => {
        this.router.navigate(['./orders', { param: 3 }]);
      });
  }

  ngOnInit() {
    this.getOrder();
  }

}
