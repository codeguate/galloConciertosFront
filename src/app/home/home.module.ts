import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DataTableModule } from 'angular-6-datatable';
import {TooltipModule} from 'ng2-tooltip-directive';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxSelectModule } from 'ngx-select-ex';

import { Ng2CompleterModule } from "ng2-completer";

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AuthService } from './_services/auth.service';
import { AuthGuard } from './../home/_guards/auth.guard';
import { HomeGuard } from './../home/_guards/home.guard';
import { HomeRoutingModule } from './home.routing';
import { NouisliderModule } from 'ng2-nouislider';

import { UsersService } from './_services/users.service';
import { GlobalsService } from './_services/globals.service';
import { EventosService } from './_services/eventos.service';

import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { EventoComponent } from './evento/evento.component';
import { CancionesComponent } from './canciones/canciones.component';
import { HomeComponent } from './home/home.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OwlModule,
    Ng2CompleterModule,
    NgxSelectModule,
    SimpleNotificationsModule.forRoot(),
    LoadersCssModule,
    NouisliderModule,
    // Ng5SliderModule,
    HomeRoutingModule,
    DataTableModule
  ],
  declarations: [
    LoginComponent,
    LoaderComponent,
    RegisterComponent,
    RecoveryComponent,
    MainComponent,
    EventoComponent,
    CancionesComponent,
    HomeComponent,
  ],
  providers: [
    AuthService,
    UsersService,
    EventosService,
    AuthGuard,
    HomeGuard,
    GlobalsService,
  ]
})
export class HomeModule { }
