import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../Order';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[];
  public product: string;

  constructor(
    private _orderService: OrderService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  getOrders() {
    this._authService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  // addOrder(event) {
  //   event.preventDefault();
  //   const newOrder = {
  //     product: this.product
  //   };
  //   this._orderService.addOrder(newOrder)
  //     .subscribe(order => {
  //       this.orders.push(order);
  //       this.product = '';
  //     });
  // }

  // deleteOrder(id) {
  //   const orders = this.orders;
  //   this._orderService.deleteOrder(id)
  //     .subscribe(data => {
  //       if (data.n === 1) {
  //         for (let i = 0; i < orders.length; i++) {
  //           if (orders[i]._id === id) {
  //             orders.splice(i, 1);
  //           }
  //         }
  //       }
  //     });
  // }

  ngOnInit() {
    this.getOrders();
  }

}
