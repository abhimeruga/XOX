
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FirebaseServiceService} from './firebase-service.service';


@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router, private fbs: FirebaseServiceService ) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        // check some condition
        if (!this.fbs.isLoggedIn)  {
            alert('You are not allowed to view this page');
            // redirect to login/home page etc
            // return false to cancel the navigation
            return false;
        }
        this.router.navigate(['/game']);
        return true;
    }

}
