import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public order: Order;
  public image: string;
  public router: Router;

  constructor(
    private _authServise: AuthService,
    private orderService: OrderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.router = _router;
  }

  getOrder() {
    this._route.params
      .switchMap((params: Params) => this._authServise.getOrder(params['id']))
      .subscribe(order => {
        this.order = order;
        this.image = this.order.image;
      });
  }

  deleteOrder(id) {
    this._authServise.deleteOrder(id)
      .subscribe(data => {
        this.router.navigate(['./orders']);
      });
  }

  finishOrder(id) {
    this.orderService.finishOrder(id)
      .subscribe(
        data => {
          this.router.navigate(['./orders']);
          },
        err => {
          console.log('err', err);
        }
      );
  }

  ngOnInit() {
    this.getOrder();
  }

}
