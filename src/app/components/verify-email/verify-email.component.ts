import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  email: string | null;
  mailSent: boolean;
  isProgressVisible: boolean;
  firebaseErrorMessage: string;

  constructor(public afAuth: AngularFireAuth,
              private authService: AuthService,
              private router: Router) {
                this.email = '';
                this.mailSent=  false;
                this.isProgressVisible = false;
                this.firebaseErrorMessage = '';
               }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  resentVerificationEmail() {
    this.isProgressVisible = true;

    this.authService.resentVerificationEmail()
    .then(result => {
      this.isProgressVisible = false;
      if (result == null) {
        console.log('Verificaion Email resent...');
        this.mailSent = true;
      }
      else if (result.isValiid == false) {
        console.log("Verification Error", result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

}
