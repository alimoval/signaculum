import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[];

  constructor(private _productService: ProductService) { }

  getProducts() {
    this._productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnInit() {
    this.getProducts();
  }

}
