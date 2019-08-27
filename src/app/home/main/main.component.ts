import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NavComponent } from "./../nav.component";
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BandasService } from "./../_services/bandas.service";

import { AppComponent } from "./../../app.component";
import {TranslateService} from '@ngx-translate/core';

declare var $: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
Table: any = null;
sliderInicio = 0;
public _id: number;
public search: any;
agregados: any[] = [];
explorer:boolean = false
mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
myCarouselImages =[1,2,3,4,5,6].map((i)=>`https://picsum.photos/640/480?image=${i}`);
mySlideOptions={margin:10,
  dots: false,
  center: true,
  items:7,
  nav: true,
  loop:true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  autoWidth:true,
  responsiveClass:true,
  responsive:{
      0:{
          items:3,
          nav:false
      },
      600:{
          items:5,
          nav:false
      },
      1000:{
          items:7,
          nav:false,
          loop:true
      }
  }};
myCarouselOptions={items: 3, dots: true, nav: true};
selectedData: any;
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
  public translate: TranslateService,
  private nav:NavComponent
  ) { }

//Llamar los metodos que se van a utilizar
ngOnInit() {
    this.blockUI.start();
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    if(this.getInternetExplorerVersion()>(-1)){
      this.explorer = true
    }

    if(this.explorer){
      console.log("Esta pagina funciona mejor en otro EXPLORADOR, no en este!");

    }
  setTimeout(() => {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').removeClass('d-none');
    $('#inSeachForm').addClass('d-none');
    $('#logoTipo').removeClass('d-none');
    this.blockUI.stop();
  }, 500);
  $(document).ready(data => {
      this.cargarSlides();

    })
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
getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
  cargarSlides(){
      this.blockUI.start();
      let today = new Date();
      let dd = String(today.getDate()>9?today.getDate():"0"+today.getDate());
      let mm = String((today.getMonth() + 1)>9?(today.getMonth() + 1):"0"+(today.getMonth() + 1)); //January is 0!
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
                              $(".owl-next").css('color', '#ffffff');

                              $(".owl-prev").css("font-size", '4rem');
                              $(".owl-prev").css('right', '60%');
                              $(".owl-prev").css('margin-top', '2%');
                              $(".owl-prev").css('position', 'absolute');
                              $(".owl-prev").css('color', '#ffffff');
                              $(".owl-prev").css('z-index', '100');

                              var owl = $('.owl-carousel');
                              owl.on('mousewheel', '.owl-stage', function (e) {
                                console.log(e.originalEvent);
                                // console.log(e);

                                if (e.originalEvent.deltaY>0) {
                                    owl.trigger('prev.owl');
                                } else {
                                    owl.trigger('next.owl');
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

  mostrar(id){
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
  }

  create(success) {
        this._service.success('¡Éxito!', success);

  }
  createError(error) {
        this._service.error('¡Error!', error);

  }
}

