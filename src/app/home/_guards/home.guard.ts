import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
providedIn: 'root',
})
export class HomeGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentId')) {
        this.router.navigate(['./../../bandas']);
      }

      if (!localStorage.getItem('currentId')) {
        return true;
      }

          // not logged in so redirect to login page with the return url




    }
}
