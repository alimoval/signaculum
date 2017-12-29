import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }