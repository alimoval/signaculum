import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Signaculum';

  constructor(
    public authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logOut();
    this._flashMessagesService.show('You are logged out.', { cssClass: 'ui green success big message', timeout: 5000 });
    this._router.navigate(['/login']);
    return false;
  }

}
