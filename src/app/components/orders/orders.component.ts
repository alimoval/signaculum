import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../Order';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[];
  public order: Order;
  public product: string;
  public searchInputForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _orderService: OrderService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  createForm() {
    this.searchInputForm = this._fb.group({
      phone: ['']
    });
  }

  getOrders() {
    this._orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  onSearchSubmit(searchInputFormData) {
    if (searchInputFormData.value.phone !== '') {
      this._orderService.getOrdersByPhone(searchInputFormData.value)
        .subscribe(orders => {
          this.orders = orders;
        });
    } else {
      this.getOrders();
    }
  }

  ngOnInit() {
    this.getOrders();
    this.createForm();
  }

}
