import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BandasService } from "./../_services/bandas.service";
import { UsersService } from "./../_services/users.service";
import { CancionesService } from "./../_services/canciones.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $: any

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  id:number
  sliderInicio = 0;
  SelectedData:any = null
  funcionesTable:any
  areasTable:any
  @BlockUI() blockUI: NgBlockUI;
  protected cancion1: string = '';
  protected cancion2: string = '';
  protected cancion3: string = '';
  protected canciones: any =[];
  protected captain: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private parentService: BandasService,
    private UsersService: UsersService,
    private mainService: CancionesService,
    private completerService: CompleterService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.getParams();
  }

  getParams(){
    this.id = +this.route.snapshot.paramMap.get("id");
    this.cargarSingle(this.id)
    this.buscarSingle(+localStorage.getItem('currentId'))
  }

  cargarSingle(id:number){
    this.blockUI.start();
      let data = {
        id:1,
        state:'0',
        filter:'evento'
      }
      this.parentService.getSingle(id)
                          .then(response => {
                            this.SelectedData = response.bandas;
                            this.SelectedData.social = response
                            console.log(this.SelectedData);
                            $(".body").addClass('body-interno');
                            $(".body").removeClass('body');
                            this.dataService = this.completerService.local(this.SelectedData.canciones, 'titulo', 'titulo');
                            response.bandas.canciones.forEach(element => {
                              this.canciones.push(element.titulo)
                            });
                            this.blockUI.stop();
                            setTimeout(() => {
                              $(".gallo-inputs>div>input").css("border","none");
                            }, 300);
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  buscarSingle(search:any){
    // let data = {
    //   id:search.titulo.replace(/_/g,' '),
    //   state:search.fecha,
    //   filter:'buscar'
    // }
      this.UsersService.getSingle(search)
                          .then(response => {
                            console.log(response)
                            response.votos.forEach(element => {
                              if(element.banda==this.id){
                                // console.log($(".gallo-inputs"));

                                setTimeout(() => {
                                  if(!$("#btnVotar").hasClass('d-none')){
                                    $("#btnVotar").addClass('d-none')
                                  }

                                  if(!$(".gallo-inputs").children("div").children("input").attr('readOnly'))
                                  {
                                    $(".gallo-inputs").children("div").children("input").attr('readOnly',true)
                                  }
                                }, 200);
                                if(this.cancion1==""){
                                  this.cancion1=element.titulo
                                }else
                                if(this.cancion2==""){
                                  this.cancion2=element.titulo
                                }else
                                if(this.cancion3==""){
                                  this.cancion3=element.titulo
                                }
                              }
                            });
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarAreas(id:number){
    this.blockUI.start();
    let data = {
      usuario:+localStorage.getItem('currentId'),
      banda:this.SelectedData.social.id,
      votos:[
        this.cancion1,
        this.cancion2,
        this.cancion3
      ]
    }
      this.parentService.votar(data)
                          .then(response => {
                            // console.log(response);
                            this.createSuccess("Su voto ha sido agregado")
                            this.buscarSingle(response.id)
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarFunciones(id:number){
    this.blockUI.start();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let MM = String(today.getMinutes()).padStart(2, '0'); //January is 0!
    let ss = String(today.getSeconds()).padStart(2, '0'); //January is 0!
    let stoday = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
    let data = {
      id:id,
      state:stoday,
      filter:'proximos_eventos'
    }
      // this.parentService.getAllFilter(data)
      //                     .then(response => {
      //                       this.funcionesTable = response;
      //                       // console.log(response);

      //                       this.blockUI.stop();
      //                     }).catch(error => {
      //                       console.clear
      //                       this.blockUI.stop();
      //                       this.createError(error)
      //                     })
  }
  navegar(url:string,id?:number){
    localStorage.removeItem('lastLinkUrl')
    if (!localStorage.getItem('currentUser')) {
      localStorage.setItem('lastLinkUrl',url);
      $('#loginTemplate').removeClass('container');
      $('#generalModalDetalle').modal("show");
    }else{
      this.router.navigate([url])
    }
  }
  collapse(str:string){
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")

    }
  }
  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  createSuccess(success) {
    this._service.info('¡Éxito!',success)
  }
  createError(error) {
    this._service.error('¡Error!',error)
  }

}
