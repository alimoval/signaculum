import { Component } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OrderService]
})
export class AppComponent {
  title = 'Signaculum';
}
