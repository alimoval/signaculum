import { Component, OnInit } from '@angular/core';
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
    private _authService: AuthService,
    private _router: Router,
  ) { }

  getOrders() {
    this._authService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  ngOnInit() {
    this.getOrders();
  }

}
