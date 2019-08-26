import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from "../_services/users.service";
import { NavComponent } from "../nav.component";
import { AuthService } from "../_services/auth.service";
import { BandasService } from "../_services/bandas.service";
declare let $: any
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selected:boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  title:any = "Registro"
  Table:any
  years = []
  days = []
  months = [
    {
      nombre:"Enero",
      id:"01"
    },
    {
      nombre:"Febrero",
      id:"02"
    },
    {
      nombre:"Marzo",
      id:"03"
    },
    {
      nombre:"Abril",
      id:"04"
    },
    {
      nombre:"Mayo",
      id:"05"
    },
    {
      nombre:"Junio",
      id:"06"
    },
    {
      nombre:"Julio",
      id:"07"
    },
    {
      nombre:"Agosto",
      id:"08"
    },
    {
      nombre:"Septiembre",
      id:"09"
    },
    {
      nombre:"Octubre",
      id:"10"
    },
    {
      nombre:"Noviembre",
      id:"11"
    },
    {
      nombre:"Diciembre",
      id:"12"
    },
  ]
  comboParent:any
  usernameF:string =""
  enviarData=false
  DPI:string = ""
  numeroTelefono:string = ""
  selectedDate:string
  @BlockUI() blockUI: NgBlockUI;
  @Input() foreignId:number
  @Input() facebook:any
  selectedData:any
  today:any
  nacimientoToday:any
  public rowsOnPage = 5;
  public search:any
  constructor(
      private _service: NotificationsService,
      private router: Router,
      private AuthService: AuthService,
      private mainService: UsersService,
      private BandasService: BandasService,
      private nav:NavComponent
    ) { }

  ngOnInit() {
    for (let index = 1; index < 32; index++) {
      this.days.push({id:index>9?index:"0"+index});

    }
    for (let index = 2001; index > 1900; index--) {
      this.years.push({id:index});

    }
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear()-21;
    this.today = yyyy + '-' + mm + '-' + dd;
    this.nacimientoToday = yyyy + '-' + mm + '-' + dd;
      $(document).ready(function () {
        // $("#edad").children("div").children("div").removeClass("row")
        $("#edad").children("div").addClass("row3")
        $("#edad").children("div").children("div.row.align-items-center.no-gutters").addClass("row2")
        $("#edad").children("div").children("div").eq(1).children("div").children("div").css("color","#ffffff")
        $("#edad").click(function(){
          if(!$("#edad").children("div").children("div.row.align-items-center.no-gutters").hasClass("row2")){
            $("#edad").children("div").children("div.row.align-items-center.no-gutters").addClass("row2")

          }

          $("#edad").children("div").children("div.row.align-items-center.no-gutters").addClass("row2")

          $("#edad").children("div").children("div.row.align-items-center.no-gutters").children("div").css("color","#ffffff");
          $("#edad").children("div").children("div").eq(1).addClass("contanerData")
          $("#edad").children("div").children("div").eq(1).children("div").children("div").css("color","#ffffff")
          $("#edad").children("div").children("div").eq(1).children("div").addClass("row3")

        })

        $("#edad").children("div").children("div.row.align-items-center.no-gutters").children('div.col-10.dl-abdtp-view-label').css("color","#ffffff")

        if($("#nombreBModal").val()!=''){
          $("#nombres").val($("#nombreBModal").val())
          $("#email").val($("#emailBModal").val())
          $("#username").val($("#email").val().split("@")[0])
          $("#idHidden").val($("#idBModal").val())
        }
      });

      if($("#email").val()!=''){
        this.usernameFind($("#email").val());
      }
      if($("#idBModal").val()!=''){
        this.buscarFacebook($("#idBModal").val());
      }
  }
  usernameFind(email:string){
    if(email.indexOf("@")>0){
      this.usernameF = email.split("@")[0]
    }else{
      this.usernameF = email
    }
  }
  select(dat:boolean){
    this.selected = dat;
  }

  buscarFacebook(id){
    this.BandasService.getUsersById(id)
                      .then(response => {
                        if(response.id){
                          localStorage.setItem('currentUser', response.username);
                          localStorage.setItem('currentEmail', response.email);
                          localStorage.setItem('currentId', response.id);
                          localStorage.setItem('currentPicture', response.foto);
                          localStorage.setItem('currentState', response.state);
                          localStorage.setItem('currentEmail', response.email);
                          localStorage.setItem('currentApellidos', response.apellidos);
                          localStorage.setItem('currentNombres', response.nombres);
                          localStorage.setItem('currentAvatar', response.foto);
                          localStorage.setItem('currentRol', response.rol);
                              this.nav.fullSession(true)
                              this.blockUI.stop();
                              this.blockUI.stop();
                              this.blockUI.stop();
                              this.blockUI.stop();
                        // this.cargarAll()
                        $("#loginModal").modal('hide');
                        $("#loginModal").modal('hide');
                        $("#loginModal").modal('hide');
                        $("#loginModal").modal('hide');
                        $("#loginModal").modal('hide');

                          setTimeout(() => {
                            $("#loginModal").modal('hide');
                          }, 100);
                          this.createSuccess('Usted ya esta Registrado')
                          setTimeout(() => {
                          $("#loginModal").modal('hide');
                            this.router.navigate(["./bandas"])
                          }, 200);
                          // location.reload();
                        }

                        this.blockUI.stop();
                        console.clear
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        // this.createError(error)
                      })
  }

  cargarAll(){
    this.blockUI.start();
    this.mainService.getAll()
                      .then(response => {
                        this.Table = response

                        this.blockUI.stop();
                        console.clear
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
  }

  cargarSingle(id:number){
    this.blockUI.start();
    this.mainService.getSingle(id)
                      .then(response => {
                        this.selectedData = response;
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  update(formValue:any){
    this.blockUI.start();
    //console.log(data)
    this.mainService.update(formValue)
                      .then(response => {
                        $("#editModal .close").click();
                        this.cargarAll()
                        this.createSuccess('Tipo de Equipos Actualizado exitosamente')
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })

  }
  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }

  insert(formValue:any){
    let fecha
      let stoday = formValue.year + '-' + formValue.month + '-' + formValue.day;

    this.blockUI.start();
    if(formValue.nombres==""){
      formValue.nombres = $("#nombres").val();
    }
    if(formValue.email==""){
      formValue.email = $("#email").val();
    }
    if(formValue.idHidden==""){
      formValue.idHidden =$("#idHidden").val();
    }
    formValue.dpi =  formValue.dpi.replace(/ /g, '').replace(/-/g, '')
    formValue.birthday =  stoday
    formValue.edad =  this.calcularEdad(stoday)
    formValue.password =  formValue.password
    formValue.username =  formValue.email.split('@')[0]
    let string = formValue.dpi.replace(/ /g, '').replace(/-/g, '')+formValue.telefono+":"+formValue.username;
    let encodedString = btoa(string);
    formValue.codigo =  encodedString.substr(encodedString.length-20,encodedString.length);
    formValue.facebook_id = formValue.idHidden;
    // console.log(formValue);
    if(formValue.edad>=18){
      this.blockUI.stop();

    this.mainService.create(formValue)
                      .then(async response => {
                        if(response.id){
                          localStorage.setItem('currentUser', response.username);
                          localStorage.setItem('currentEmail', response.email);
                          localStorage.setItem('currentId', response.id);
                          localStorage.setItem('currentPicture', response.foto);
                          localStorage.setItem('currentState', response.state);
                          localStorage.setItem('currentEmail', response.email);
                          localStorage.setItem('currentApellidos', response.apellidos);
                          localStorage.setItem('currentNombres', response.nombres);
                          localStorage.setItem('currentAvatar', response.foto);
                          localStorage.setItem('currentRol', response.rol);
                              this.nav.fullSession(true)
                              this.blockUI.stop();
                        // this.cargarAll()

                          $("#loginModal").modal('hide');
                          this.createSuccess('Su Registro se envio con exito')
                          setTimeout(() => {
                            this.router.navigate(["./bandas"])
                          }, 200);
                          // location.reload();
                        }
                        // console.log(this.foreignId);


                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        console.log(error);
                        if(error.status==400){
                          this.createError("Perdon, su correo ya ha sido registrado")

                        }else{
                        this.createError(error)

                        }
                      })

                    }else{
                        this.blockUI.stop();
                        this.createError('Debes ser mayor de edad para registrarte')
                    }

  }
  delete(id:string){
    this.blockUI.start();
    if(confirm("¿Desea eliminar el Tipo de Equipos?")){
    this.mainService.delete(id)
                      .then(response => {
                        this.cargarAll()
                        this.createSuccess('Tipo de Equipos Eliminado exitosamente')
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
    }else{
                        console.clear

                        this.blockUI.stop();
    }

  }

  calidarTele(event){
    this.enviarData=false;
    let tel
    if(this.numeroTelefono.length>5){
      tel=this.numeroTelefono.substring(4,this.numeroTelefono.length).replace(/ /g, '').replace(/-/g, '')

    }else{
      tel=this.numeroTelefono.replace(/ /g, '').replace(/-/g, '')
    }
    if((event.keyCode)==8)        //"Enter" Key (13)
      {
        tel=tel.substring(0,tel.length);
        event.stopPropagation();
        return false;
      }
    this.numeroTelefono = this.formatearTel(tel);
  }

  cuiIsValid(event) {


    this.enviarData=false;
    // console.log(this.DPI.length)
      let cui=this.DPI.replace(/ /g, '').replace(/-/g, '')
      if((event.keyCode)==8)        //"Enter" Key (13)
      {
        cui=cui.substring(0,cui.length);
        event.stopPropagation();
        return false;
      }
      if (!cui) {
          // console.log("CUI vacío");
          this.DPI = this.formatearDPI(cui);

          return true;
      }

      let cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

      if (!cuiRegExp.test(cui)) {
          $("#dpi").addClass('border border-danger')
          // console.log("CUI con formato inválido");
          this.DPI = this.formatearDPI(cui);
          return false;
      }

      cui = cui.replace(/\s/, '');
      let depto = parseInt(cui.substring(9, 11), 10);
      let muni = parseInt(cui.substring(11, 13));
      let numero:any = Array.from(cui.substring(0, 8));
      let verificador = parseInt(cui.substring(8, 9));

      // Se asume que la codificación de Municipios y
      // departamentos es la misma que esta publicada en
      // http://goo.gl/EsxN1a

      // Listado de municipios actualizado segun:
      // http://goo.gl/QLNglm

      // Este listado contiene la cantidad de municipios
      // existentes en cada departamento para poder
      // determinar el código máximo aceptado por cada
      // uno de los departamentos.
      let munisPorDepto = [
          /* 01 - Guatemala tiene:      */ 17 /* municipios. */,
          /* 02 - El Progreso tiene:    */  8 /* municipios. */,
          /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */,
          /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
          /* 05 - Escuintla tiene:      */ 13 /* municipios. */,
          /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
          /* 07 - Sololá tiene:         */ 19 /* municipios. */,
          /* 08 - Totonicapán tiene:    */  8 /* municipios. */,
          /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */,
          /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
          /* 11 - Retalhuleu tiene:     */  9 /* municipios. */,
          /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
          /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */,
          /* 14 - Quiché tiene:         */ 21 /* municipios. */,
          /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */,
          /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
          /* 17 - Petén tiene:          */ 14 /* municipios. */,
          /* 18 - Izabal tiene:         */  5 /* municipios. */,
          /* 19 - Zacapa tiene:         */ 11 /* municipios. */,
          /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
          /* 21 - Jalapa tiene:         */  7 /* municipios. */,
          /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
      ];

      if (depto === 0 || muni === 0)
      {
          console.log("CUI con código de municipio o departamento inválido.");
          this.DPI = this.formatearDPI(cui);
          return false;
      }

      if (depto > munisPorDepto.length)
      {
          console.log("CUI con código de departamento inválido.");
          this.DPI = this.formatearDPI(cui);
          return false;
      }

      if (muni > munisPorDepto[depto -1])
      {
          console.log("CUI con código de municipio inválido.");
          this.DPI = this.formatearDPI(cui);
          return false;
      }

      // Se verifica el correlativo con base
      // en el algoritmo del complemento 11.
      let total = 0;

      for (let i = 0; i < numero.length; i++)
      {
          total += numero[i] * (i + 2);
      }

      let modulo = (total % 11);
      this.DPI = this.formatearDPI(cui);
      console.log("CUI con módulo: " + modulo);
      $("#dpi").removeClass('border border-danger')
      $("#dpi").addClass('border border-success')
      this.enviarData=true;

      return modulo === verificador;
  }
  formatearDPI(dpi){
    let numero:any = Array.from(dpi);
    let result = "";
    numero.forEach((element,i) => {
      result+=element
      if(i==3){
        result+=" - ";
      }

      if(i==8){
        result+=" - ";
      }

    });
    if(dpi.length>13){
      result = result.substring(0,result.length-1)
      this.enviarData=true;
      $("#dpi").removeClass('border border-danger')
      $("#dpi").addClass('border border-success')
    }else{
      this.enviarData=false;

      $("#dpi").addClass('border border-danger')


    }
    return result;
  }
  formatearTel(tel){
    let numero:any = Array.from(tel);
    let result = "+502 ";
    numero.forEach((element,i) => {
      result+=element
      if(i==3){
        result+=" - ";
      }

    });

    if(tel.length>=8){
      result = result.substring(0,16)
      this.enviarData=true;
      $("#telefono").removeClass('border border-danger')
      $("#telefono").addClass('border border-success')
    }else{
      this.enviarData=false;

      $("#telefono").addClass('border border-danger')


    }
    return result;
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
}
