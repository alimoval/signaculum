import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { NgSelectModule } from '@ng-select/ng-select';

import { Product } from '../../models/Product';

import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { NovaPoshtaService } from '../../services/nova-poshta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public novaPoshtaCities$: Observable<any>;

  public router: Router;
  public orderForm: FormGroup;
  public product: Product;
  public price = 0;
  public print: boolean;
  public outdoor: boolean;
  public luvers: boolean;
  public novaPoshtaCities: string;
  public novaPoshtaCityName: string;
  public novaPoshtaWarehouses: string;
  public orderAmount: any;
  public showEmailInputFlag = false;
  public purchaseFlag = false;
  public query: String;


  constructor(
    private _novaPoshtaService: NovaPoshtaService,
    private _orderService: OrderService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _ngSelect: NgSelectModule,
  ) {
    this.router = _router;
  }

  ngOnInit() {
    this.getProduct();
    this.getNovaPoshtaCities();
  }

  // Get Order Product
  getProduct() {
    this._route.params
      .switchMap((params: Params) => this._productService.getProduct(params['id']))
      .subscribe(product => {
        this.product = product;
        this.outdoor = this.product.outdoor;
        this.print = this.product.print;
        this.luvers = this.product.luvers;
        this.createForm(this.product);
        this.priceCalculate();
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
      width: [0, Validators.required],
      height: [0, Validators.required],
      surName: ['', Validators.required],
      warehouse: ['', Validators.required]
    });
    if (this.outdoor) {
      this.orderForm.patchValue({
        amount: 1
      });
    }
  }

  // Calculate Selected Product Price
  priceCalculate() {
    const sizeValue = this.orderForm.get('size').value;
    const index = this.product.sizes.indexOf(sizeValue);
    const width = this.orderForm.get('width').value;
    const height = this.orderForm.get('height').value;
    const multipleResult = width * height * 0.000001;
    let amount = this.orderForm.get('amount').value;
    if (this.outdoor) {
      amount = amount * multipleResult;
    }
    if (this.luvers) {
      // this.orderForm.patchValue({
      //   amount: ''
      // });
    }
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

  getNovaPoshtaWarehouses(city) {
    this._novaPoshtaService.getWarehouses(city.Ref)
      .subscribe(
        response => {
          this.novaPoshtaWarehouses = response.data;
        },
        err => {
          console.log('err', err);
        });
    this.tempFormValueRefresh();
  }

  addOrder(data) {
    this._orderService.addOrder(data)
      .subscribe(
        res => console.log('New Order Added'),
        err => console.log('err', err)
      );
  }

  onSubmit(orderForm): void {
    this.addOrder(orderForm.value);
    this.purchaseFlag = true;
    window.scrollBy(0, 100);
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

}
