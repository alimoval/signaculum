import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { OrderService } from '../../services/order.service';
import { Order } from '../../../Order';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../Product';
import { NovaPoshtaService } from '../../services/nova-poshta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public router: Router;
  public orderForm: FormGroup;
  public product: Product;
  public price = 0;
  public sizeFlag: boolean;
  public outdoor: boolean;
  public novaPoshtaCities: string;
  public novaPoshtaCityName: string;
  public novaPoshtaWarehouses: string;
  public orderAmount: string;
  public showEmailInputFlag = false;
  public purchaseFlag = false;


  constructor(
    private _novaPoshtaService: NovaPoshtaService,
    private _orderService: OrderService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.router = _router;
  }

  // Get Order Product
  getProduct() {
    this._route.params
      .switchMap((params: Params) => this._productService.getProduct(params['id']))
      .subscribe(product => {
        this.product = product;
        this.createForm(this.product);
        this.priceCalculate();
        // this.sizeFlag = this.product.sizeFlag;
        // this.outdoor = this.product.outdoor;
      });
  }

  // Build Reactive Order Form
  createForm(product?) {
    this.orderForm = this._fb.group({
      address: ['', Validators.required],
      amount: [1000, Validators.required],
      description: '',
      email: '',
      image: [],
      link: '',
      name: ['', Validators.required],
      product: [product.name, Validators.required],
      price: [product.price, Validators.required],
      phone: ['', Validators.required],
      size: [product.sizes[0], Validators.required],
      surName: ['', Validators.required],
      warehouse: ['', Validators.required]
    });
  }

  // Calculate Selected Product Price
  priceCalculate() {
    const sizeValue = this.orderForm.get('size').value;
    const index = this.product.sizes.indexOf(sizeValue);
    const amount = this.orderForm.get('amount').value;
    const prices = this.product.prices[index];
    this.orderAmount = amount;
    for (let i = 0; i < Object.keys(prices).length; i++) {
      if (+amount <= +Object.keys(prices)[i]) {
        if (i !== 0) {
          if (+amount > +Object.keys(prices)[i - 1]) {
            this.price = prices[Object.keys(prices)[i]];
          }
        } else {
          this.price = prices[Object.keys(prices)[i]];
        }
      } else if (+amount > +Object.keys(prices)[Object.keys(prices).length - 1]) {
        this.orderForm.patchValue({
          amount: Object.keys(prices)[Object.keys(prices).length - 1]
        });
        this.priceCalculate();
      }
    }
    this.orderForm.patchValue({
      price: this.price
    });
  }

  // Refresh Prices
  tempFormValueRefresh() {
    this.priceCalculate();
  }

  searchByPhone() {
    console.log('search throught all orders to find orders with this phone');
  }

  showEmailInput() {
    this.showEmailInputFlag = true;
  }

  getNovaPoshtaCities() {
    this._novaPoshtaService.getCities()
      .subscribe(response => {
        this.novaPoshtaCities = response.data;
      });
  }

  getNovaPoshtaCityName(event) {
    this._novaPoshtaService.getCity(event.target.value)
      .subscribe(response => {
        this.novaPoshtaCityName = response.data[0].Description;
        this.orderForm.patchValue({
          address: this.novaPoshtaCityName
        });
      });
  }

  getNovaPoshtaWarehouses(event) {
    this._novaPoshtaService.getWarehouses(event.target.value)
      .subscribe(response => {
        this.novaPoshtaWarehouses = response.data;
      });
    this.tempFormValueRefresh();
  }

  addOrder(data) {
    this._orderService.addOrder(data)
      .subscribe();
  }

  onSubmit(orderForm): void {
    this.addOrder(orderForm.value);
    this.purchaseFlag = true;
  }

  returnToProductsList() {
    this.router.navigate(['/']);
  }

  designUpload() {
    document.getElementById('hidden-new-file').click();
  }

  fileUpload(fileInput: any) {
    this.orderForm.patchValue({
      image: fileInput.target.files
    });
  }

  ngOnInit() {
    this.getProduct();
    this.getNovaPoshtaCities();
  }

}
