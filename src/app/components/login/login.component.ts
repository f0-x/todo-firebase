import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isProgressVisible: boolean;
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
                this.isProgressVisible = false;
                this.loginForm = new FormGroup(
                  {'email': new FormControl('', [Validators.required, Validators.email]),
                'password': new FormControl('', Validators.required)}
                );
                this.firebaseErrorMessage = '';
               }

  ngOnInit(): void {
    if (this.authService.userLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginUser() {
    this.isProgressVisible = true;

    if(this.loginForm.invalid) {
      console.log("Login Form Invalid");
      return;
    }

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    .then((result) => {
      if(result == null) {
        console.log('Logging in...');
        this.router.navigate(['/dashboard']);
      }
      else if(result.isValid == false) {
        console.log("Login error", result);
        this.firebaseErrorMessage = result.message;
      }
    })
  }

}
