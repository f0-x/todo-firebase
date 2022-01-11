import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//To easily check the status of User's login
  userLoggedIn?: boolean;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
                this.userLoggedIn = false;
/* Creating a subscription such that everytime the authentication changes i.e(User loges in/out)
this check gets done */
                this.afAuth.onAuthStateChanged((user) =>{
                  if(user) {
                    this.userLoggedIn = true;
                  } else {
                    this.userLoggedIn = false;
                  }
                });
               }

               loginUser(email:string, password: string): Promise<any> {
                 return this.afAuth.signInWithEmailAndPassword(email, password)
                 .then(() => {
                   console.log('Auth Service: loginUser: success');
                   //this.router.navigate(['/dashboard']);
                 })
                 .catch(error => {
                   console.log('Auth Service: login error...');
                   console.log('error code', error.code);
                   console.log('error', error);
                   if (error.code)
                      return { isValid: false, message: error.message};
                 });

                }
                signupUser(user: any): Promise<any> {
                  return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
                  .then(
                    (result) => {
                      let emailLower = user.email.toLowerCase();

                      this.afStore.doc('/users' + emailLower)
                      .set(
                        {
                          accountType: 'endUser',
                          displayName: user.displayName,
                          displayName_lower: user.displayName.toLowerCase(),
                          email : user.email,
                          email_lower: emailLower
                        }
                      )
                      result.user?.sendEmailVerification();
                    }
                  )
                  .catch((error) => {
                    console.log('Auth Service: signup error', error);
                    if(error.code) {
                      return {isValid: false, message: error.message};
                    }
                  });
                }

                resetPassword(email: string): Promise<any>{
                  return this.afAuth.sendPasswordResetEmail(email)
                  .then(
                    () => {
                      console.log('Auth Service: reset password success');
                      //this.router.navigate(['/amount']);
                    }
                  )
                  .catch((error) => {
                    console.log('Auth Service: reset password error...');
                    console.log(error.code);
                    console.log(error)
                    if(error.code) {
                      return error;
                    }
                  });
                }

                async resentVerificationEmail() {
                  return (await this.afAuth.currentUser)?.sendEmailVerification()
                  .then(
                    () => {/*this.router.navigate(['/home']);*/}
                  )
                  .catch(
                    error => {
                      console.log('Auth Service: senderVerificationEmail error...');
                      console.log('error code', error.code);
                      console.log('error',error);
                      if(error.code) return error;
                    }
                  )
                }

                logoutUser(): Promise<any> {
                  return this.afAuth.signOut()
                  .then(
                    () => {
                      this.router.navigate(['/home']);
                    }
                  )
                  .catch((error) => {
                    console.log('Auth Service: logout error...');
                    console.log('error code', error.code);
                    console.log('error', error);
                    if(error.code) return error;
                  })
                }

                setUserInfo(payload: object) {
                  console.log('Auth Service: saving user info...');
                  this.afStore.collection('users')
                  .add(payload)
                  .then(
                    (response) => {
                      console.log('Auth Service: setUserInfo response...')
                      console.log(response);
                    }
                  )
                }

                getCurrentUser() {
                  return this.afAuth.currentUser;
                }
               
}
