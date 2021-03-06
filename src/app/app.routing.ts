import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { NavComponent } from "./home/nav.component";

const routes: Routes = [
  { path: '',component: NavComponent, loadChildren: 'app/home/home.module#HomeModule'},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
