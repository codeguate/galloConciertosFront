import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentId')) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('currentEmail');
          localStorage.removeItem('currentFirstName');
          localStorage.removeItem('currentLastName');
          localStorage.removeItem('currentId');
          localStorage.removeItem('currentPicture');
          localStorage.removeItem('currentState');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('currentBisCardId');
          localStorage.removeItem('currentEmail');
          localStorage.removeItem('currentApellidos');
          localStorage.removeItem('currentNombres');
          localStorage.removeItem('currentEstado');
          localStorage.removeItem('currentSalt');
          localStorage.removeItem('currentTelefono');
          localStorage.removeItem('currentAvatar');
          localStorage.removeItem('token');
          localStorage.removeItem('currentNuevaSesion');
          localStorage.removeItem('currentTipoUsuarioId');
          this.router.navigate(['./../../../../../../']);
          return true;
        }

        if (!localStorage.getItem('currentId')) {
          this.router.navigate(['./../../../../../../']);
        }
    }
}
