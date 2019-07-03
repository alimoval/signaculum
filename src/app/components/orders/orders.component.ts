import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../../../Order';
import { OrderService } from '../../services/order.service';

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
    private _orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getOrders();
    this.createForm();
    this.onChanges();
  }

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

  onChanges = (): void => {
    this.searchInputForm.valueChanges.subscribe(() => {
      this.onSearchSubmit(this.searchInputForm);
    });
  }

}
