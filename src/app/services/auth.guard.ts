import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
//Create a construtor to access our Router & FireAuth services
  constructor(private router: Router,
              private afAuth: AngularFireAuth) {

              }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

/*     return true; would allow access to every routes snapshot*/
/*     so, instead we return a single future value Promise which
        either resolves to true or false          */

      return new Promise((resolve, reject) => {
        this.afAuth.onAuthStateChanged((user) => {
          if(user) {
/*             if(!user.emailVerified) //Make sure their email is verified
              this.router.navigate(['/verify-email']); */
              resolve(true);
          } else {
            console.log('Auth Guard: User is not Logged In');
            this.router.navigate(['/home']); // If the user is logged out send to home
            resolve(false);
          }
        });
      });
  }
}
