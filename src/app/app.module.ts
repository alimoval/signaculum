import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

import { NovaPoshtaService } from './services/nova-poshta.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { CitySearchPipe } from './pipes/city-search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    CitySearchPipe,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    OrderService,
    ProductService,
    NovaPoshtaService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
