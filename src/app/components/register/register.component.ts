import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  createForm() {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Register user
  registerUser(user) {
    this._authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('You are now registered and can login');
        this._router.navigate(['/login']);
      } else {
        console.log('Something went wrong');
        this._router.navigate(['/register']);
      }
    });
  }

  onRegisterSubmit(registerFormData) {
    this.registerUser(registerFormData.value);
  }

  ngOnInit() {
    this.createForm();
  }

}
