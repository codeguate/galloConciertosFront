import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentId')) {
          return true;
        }

        if (!localStorage.getItem('currentId')) {
          this.router.navigate(['./../../../../../../']);
        }
    }
}
