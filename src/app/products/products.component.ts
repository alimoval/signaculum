import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../Product';

@Component({
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
