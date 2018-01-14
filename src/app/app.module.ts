import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { OrderFormComponent } from './order-form/order-form.component';

import { NovaPoshtaService } from './nova-poshta.service';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    OrderFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    OrderService,
    ProductService,
    NovaPoshtaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
