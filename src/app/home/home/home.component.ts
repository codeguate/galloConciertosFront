import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacebookService, InitParams, LoginResponse, LoginOptions, AuthResponse } from 'ngx-facebook';

import { NavComponent } from "./../nav.component";
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BandasService } from "./../_services/bandas.service";

import { AppComponent } from "./../../app.component";
import {TranslateService} from '@ngx-translate/core';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Table: any = null;
  sliderInicio = 0;
  public _id: number;
  public search: any;
  agregados: any[] = [];
  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages =[1,2,3,4,5,6].map((i)=>`https://picsum.photos/640/480?image=${i}`);
  mySlideOptions={items: 3, dots: false, center:true,nav: true,loop:true,autoplay:true,autoplayTimeout:3000,autoplayHoverPause:true,autoWidth:true};
  myCarouselOptions={items: 3, dots: true, nav: true};
  selectedData: any;
  facebookData = {
    id:'',
    email:'',
    nombre:'',
  }
  scope:string = 'public_profile,email'
  @BlockUI() blockUI: NgBlockUI;
  browserLang:any = this.parentComponent.browserLang;
  Id:any = '';
  slides:any
  foreignId:number = 0
  //Servicio el cual se va a trabajar
  constructor(
    private parentComponent: NavComponent,
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private BandasService:BandasService,
    private app: AppComponent,
    private fb: FacebookService,
    public translate: TranslateService,
    private nav:NavComponent
    ) {
      let initParams: InitParams = {
        appId: '1217671678415675',
        status     : true,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.1'
      };

      fb.init(initParams);

     }

  //Llamar los metodos que se van a utilizar
  ngOnInit() {
      this.blockUI.start();
      let datos = localStorage.getItem('carrito');
      if(datos){
        this.agregados = JSON.parse(datos);
      }
    setTimeout(() => {
      $('html, body').animate({scrollTop:0}, '300');
      $('#searchContent').removeClass('d-none');
      $('#inSeachForm').addClass('d-none');
      $('#logoTipo').removeClass('d-none');
      this.blockUI.stop();
    }, 500);
    $(document).ready(data => {
      // this.checkLoginState();

      })
  }

  checkLoginState() {
    const authResponse: AuthResponse = this.fb.getAuthResponse();
    // console.log(authResponse)
    if(authResponse){
      this.getFacebookData();

    }else{
      this.loginWithFacebook();
    }
  }

  getFacebookData(callback?) {
    this.fb.api('/me',"get",
    {"fields":"email,first_name,last_name,id,gender"})
            .then(function (response) {

              $("#registroBody #nombres").val(response.first_name+" "+response.last_name);
              $("#registroBody #email").val(response.email);
              $("#registroBody #idHidden").val(response.id);
              $("#registroBody #email").focus();
              $("#registroBody #idHidden").focus();
              $("#registroBody #nombres").focus();
              // $("#getFacebookData").click();
              $(".gallo-btn-registrate").click()




              // console.log(response);

            }).catch(error => {
              console.log(error);

            });
  }
  getFacebookDataF(){
    this.BandasService.getUsersById($("#idHidden").val())
                        .then(response1 => {
                          console.log(response1);

                          this.blockUI.stop();
                          if(response1.id && response1.id >0){
                            localStorage.setItem('currentUser', response1.username);
                            localStorage.setItem('currentEmail', response1.email);
                            localStorage.setItem('currentId', response1.id);
                            localStorage.setItem('currentPicture', response1.foto);
                            localStorage.setItem('currentState', response1.state);
                            localStorage.setItem('currentEmail', response1.email);
                            localStorage.setItem('currentApellidos', response1.apellidos);
                            localStorage.setItem('currentNombres', response1.nombres);
                            localStorage.setItem('currentAvatar', response1.foto);
                            localStorage.setItem('currentRol', response1.rol);
                                // console.log(response);

                                setTimeout(() => {

                                  this.router.navigate([`./bandas`])
                                }, 200);
                          }else{
                            $(".gallo-btn-registrate").click()
                          }


                        }).catch(error => {
                          $(".gallo-btn-registrate").click()
                          console.clear

                          this.blockUI.stop();
                          this.createError(error)
                        })
    this.facebookData.nombre=$("#nombres").val();
    this.facebookData.email=$("#email").val();
    this.facebookData.id=$("#idHidden").val();
  }
  loginWithFacebook(): void {

    const options: LoginOptions = {
      scope: this.scope,
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
            .then((response: LoginResponse) => {
              // console.log('Logged in', response)
              if (response.status === 'connected') {
                // Acción que se desencadena cuando el usuario está conectado
                // a Facebook y a nuestra APP
                this.getFacebookData(response); // Extraer los datos

                } else if (response.status === 'not_authorized') {
                  // Acción que se desencadena cuando el usuario está conectado
                  // a Facebook pero NO a nuestra APP
                  //btnInicioApp(); // Botón para iniciar sesión en el APP

                } else {
                  // Acción que se desencadena cuando el usuario no está
                  // conectado a Facebook y sepa Dios si a nuestra App
                  // this.loginWithFacebook(); // Botón para iniciar sesión en FB
                }

            })
            .catch((error: any) => {
              console.error('Error logging in',error)
            });

  }
  navegar(url:string,id?:number){
    this.blockUI.start()
    if(+localStorage.getItem('currentId')>0){
      this.blockUI.stop()

      this.router.navigate([url])
    }else{
      this.foreignId = id
      this.mostrar('login');
      $("#loginModal").modal('show');
    this.blockUI.stop()

    }
  }
    cargarSlides(){
        this.blockUI.start();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let stoday = yyyy + '-' + mm + '-' + dd;
        let data = {
          id:1,
          state:'0',
          filter:'evento'
        }
        this.BandasService.getAllFilter(data)
                            .then(response => {
                              this.Table = response;
                              // console.log(response);
                              setTimeout(() => {
                                $(".owl-next").css("font-size", '4rem');
                                $(".owl-next").css('margin-left', '10%');
                                $(".owl-next").css('margin-top', '2%');
                                $(".owl-next").css('position', 'absolute');
                                $(".owl-next").css('z-index', '100');

                                $(".owl-prev").css("font-size", '4rem');
                                $(".owl-prev").css('right', '60%');
                                $(".owl-prev").css('margin-top', '2%');
                                $(".owl-prev").css('position', 'absolute');
                                $(".owl-prev").css('z-index', '100');

                                var owl = $('.owl-carousel');
                                owl.on('mousewheel', '.owl-stage', function (e) {
                                  if (e.deltaY>0) {
                                      owl.trigger('next.owl');
                                  } else {
                                      owl.trigger('prev.owl');
                                  }
                                    e.preventDefault();
                                });

                              }, 300);
                              this.blockUI.stop();
                            }).catch(error => {

                              console.clear

                              this.blockUI.stop();
                              this.createError(error)
                            })

      }
    cargarTop(){
      // let datos = localStorage.getItem('carrito');
      // if(datos){
      //   this.agregados = JSON.parse(datos);
      // }
      // this.blockUI.start();
      // let data = {
      //   limit: 20,
      //   tipo: 2
      // }
      // this.secondService.getTop(data)
      //                 .then(response => {
      //                   response.forEach(element => {
      //                     if(this.agregados.find(data => {
      //                       return data.id == element.id
      //                     })){
      //                       element.compare = true;
      //                       element.ranking = 5;
      //                     }else{
      //                       element.compare = false;
      //                       element.ranking = 5;
      //                     }

      //                   });
      //                   this.Biss = response;
      //                   // console.log(response);

      //                   this.blockUI.stop();
      //                 }).catch(error => {

      //                   console.clear

      //                   this.blockUI.stop();
      //                   this.createError(error)
      //                 })
    }

    removeShoppingCar(data: any) {
      let datos = localStorage.getItem('carrito');
      if(datos){
        this.agregados = JSON.parse(datos);
      }
      this.agregados.splice(this.agregados.findIndex(dat => {
        return dat.id == data.id
      }), 1)
      localStorage.setItem('carrito', JSON.stringify(this.agregados));
      this.nav.removeShoppingCar(data);

      this.create("Se eliminó el Bis de tu lista de comparacion");
    }

    addShoppingCar(data:any){
      let datos = localStorage.getItem('carrito');
      if(datos){
        this.agregados = JSON.parse(datos);
      }
      this.agregados.push(data);
      this.nav.addShoppingCar(data);
      localStorage.setItem('carrito', JSON.stringify(this.agregados));
      // console.log(this.agregados);

          this.create("Listo para Comparar")
      //console.log(this.agregados.length);
      //location.reload();
    }
    public options = {
        position: ['bottom', 'right'],
        timeOut: 2000,
        lastOnBottom: false,
        animate: 'fromLeft',
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 200
    };

    mostrar(id,modal?:boolean){
      this.blockUI.start();
      if(modal){
        this.foreignId=1
        setTimeout(() => {
          $("#loginModal").modal('show')
        }, 500);
      }
      setTimeout(() => {
        if(!$("#registroBody").hasClass('d-none')){
          $("#registroBody").addClass('d-none');
        }
        if(!$("#recoveryBody").hasClass('d-none')){
          $("#recoveryBody").addClass('d-none');
        }
        if(!$("#loginBody").hasClass('d-none')){
          $("#loginBody").addClass('d-none');
        }
        $("#"+id+"Body").removeClass('d-none');
      }, 300);

      this.blockUI.stop();

    }

    abrir(id,modal?:boolean){
      this.blockUI.start();
      if(modal){
        setTimeout(() => {
          $("#"+id).modal('show')
        }, 500);
      }

      this.blockUI.stop();

    }

    create(success) {
          this._service.success('¡Éxito!', success);

    }
    createError(error) {
          this._service.error('¡Error!', error);

    }
  }

