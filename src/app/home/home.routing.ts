import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { EventoComponent } from './evento/evento.component';
import { CancionesComponent } from './canciones/canciones.component';
import { HomeComponent } from './home/home.component';

import { HomeGuard } from "./_guards/home.guard";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'bandas', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'votar/:id', component: CancionesComponent, canActivate: [AuthGuard] },
  { path: 'evento/:id/:fecha', component: EventoComponent},
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'recovery', component: RecoveryComponent, canActivate: [HomeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
