import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BandasService } from "./../_services/bandas.service";
import { Location, LocationStrategy } from '@angular/common';
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
  Table:any
  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages =[1,2,3,4,5,6].map((i)=>`https://picsum.photos/640/480?image=${i}`);
  mySlideOptions={items: 5,
    responsive:{
        600:{
            items:3
        }
    }, dots: false, center:true,nav: false,loop:true,autoplay:true,autoplayTimeout:3000,autoplayHoverPause:true,autoWidth:true};
  myCarouselOptions={items: 3, dots: true, nav: true};
  areasTable:any
  @BlockUI() blockUI: NgBlockUI;
  protected cancion1: string = '';
  protected cancion2: string = '';
  openOnClick:boolean = true;
  openOnClick2:boolean = false;
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
  protected dataSource1: CompleterData;
  protected dataSource2: CompleterData;
  protected dataSource3: CompleterData;
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private parentService: BandasService,
    private UsersService: UsersService,
    private location: Location,
    private mainService: CancionesService,
    private completerService: CompleterService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.cargarFunciones();
    this.getParams();
  }
  goBack(){
    console.log("prueba");

    this.location.back();
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
                            // console.log(this.SelectedData);
                            $(".body").addClass('body-interno');
                            $(".body").removeClass('body');
                            let dat = this.SelectedData.canciones.map(element => { return element.titulo})

                            this.dataService = this.completerService.local(dat);
                            response.bandas.canciones.forEach(element => {
                              this.canciones.push(element.titulo)
                            });
                            this.openOnClick2=false
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
                            // console.log(response)
                            response.votos.forEach(element => {
                              if(element.banda==this.id){
                                // console.log($(".gallo-inputs"));

                                setTimeout(() => {
                                  if(!$("#btnVotar").attr('disabled')){
                                    $("#btnVotar").attr('disabled','true')
                                  }

                                  if(!$(".gallo-inputs").children("div").children("input").attr('readOnly'))
                                  {
                                    this.openOnClick2=true;

                                    $(".gallo-inputs").children("div").children("input").attr('readOnly',true)
                                  }
                                }, 200);
                                setTimeout(() => {
                                  $("#graciasModal").modal('show')
                                }, 500);
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
  reactivar(id){
    if(this.cancion1=="" || this.cancion2=="" || this.cancion3==""){
      $("#cancionInput"+id).attr('readOnly',false)
      $("#cancionInput"+id).attr('disabled',false)
    }
  }
  eliminar(cancion,id?){

    this.SelectedData.canciones.splice(this.SelectedData.canciones.findIndex(dat => {
      return dat.titulo == cancion
    }), 1)
    setTimeout(() => {
    $("#cancionInput"+id).attr('readOnly',true)
    $("#cancionInput"+id).attr('disabled',true)

    }, 500);
    let dat = this.SelectedData.canciones.map(element => { return element.titulo})
    // this.dataService = null;
    if(id==1){
      this.dataSource1 = this.completerService.local(dat);

    }else if(id==2){
      this.dataSource2 = this.completerService.local(dat);

    }
    this.dataService = this.completerService.local(dat);

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

  cargarFunciones(){
    let data = {
      id:1,
      state:'0',
      filter:'evento'
    }
    this.parentService.getAllFilter(data)
                          .then(response => {
                            this.Table = response;
                            // console.log(response);
                            setTimeout(() => {
                              $(".owl-next").css("font-size", '4rem');
                              $(".owl-next").css('margin-left', '10%');
                              $(".owl-next").css('margin-top', '-2%');
                              $(".owl-next").css('position', 'absolute');
                              $(".owl-next").css('z-index', '100');

                              $(".owl-prev").css("font-size", '4rem');
                              $(".owl-prev").css('right', '60%');
                              $(".owl-prev").css('margin-top', '-2%');
                              $(".owl-prev").css('position', 'absolute');
                              $(".owl-prev").css('z-index', '100');



                              $(".owl-dots").css('background-image', 'url(http://documentos.devcodegt.com/gallo/boton.png)');
                              $(".owl-dots").css('margin-top', '5%');
                              $(".owl-dots").css('position', 'absolute');
                              $(".owl-dots").css('width', '100%');
                              var owl = $('.owl-carousel');
                              owl.on('mousewheel', '.owl-stage', function (e) {
                                if (e.deltaY>0) {
                                    owl.trigger('next.owl');
                                } else {
                                    owl.trigger('prev.owl');
                                }
                                e.preventDefault();
                            });
                            }, 500);
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  navegar(url:string,id?:number){
    this.router.navigate([url])

    this.id = id;
    this.cargarSingle(this.id)
    this.buscarSingle(+localStorage.getItem('currentId'))
    setTimeout(() => {
      location.reload();
    }, 200);

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
