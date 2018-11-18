import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit(loginFormData) {

    this._authService.authenticateUser(loginFormData.value).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('You are now logged in.', { cssClass: 'ui green success big message', timeout: 5000 });
        this._authService.storeUserData(data.token, data.user);
        this._router.navigate(['/orders']);
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'ui negative big message', timeout: 5000 });
        this._router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
