import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { OrderService } from './order.service';
import { ProductService } from './product.service';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    OrderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
