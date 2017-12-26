import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../../Order';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[];
  public product: string;

  constructor(private _orderService: OrderService) { }

  getOrders() {
    this._orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  addOrder(event) {
    event.preventDefault();
    var newOrder = {
      product: this.product
    }
    this._orderService.addOrder(newOrder)
      .subscribe(order => {
        this.orders.push(order);
        this.product = '';
      });
  }

  deleteOrder(id) {
    var orders = this.orders;
    this._orderService.deleteOrder(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < orders.length; i++) {
            if (orders[i]._id == id) {
              orders.splice(i, 1);
            }
          }
        }
      });
  }

  ngOnInit() {
    this.getOrders();
  }

}
