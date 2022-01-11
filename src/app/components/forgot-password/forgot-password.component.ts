import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  mailSent?: boolean;
  isProgressVisible?: boolean;
  forgotPasswordForm!: FormGroup;
  firebaseErrorMessage?: string;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService,
              private router: Router) {
                this.mailSent = false;
                this.isProgressVisible = false;
                this.forgotPasswordForm = new FormGroup(
                  {'email': new FormControl('', [Validators.required, Validators.email])}
                )
                this.firebaseErrorMessage = '';
               }


  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if(user){
        this.forgotPasswordForm?.patchValue({
          email: user.email
        })
      }
    })
  }

  retrievePassword() {
    this.isProgressVisible = true;

    if(this.forgotPasswordForm?.invalid) return;

    this.authService.resetPassword(this.forgotPasswordForm?.value.email)
    .then((result) => {
      this.isProgressVisible = false;
      if(result == null) {
        console.log("Password reset email sent...");
        this.mailSent = true;
/*         this.router.navigate(['/dashboard']); */
      }
      else if(result.isValid == false) {
        console.log("Login error", result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

}
