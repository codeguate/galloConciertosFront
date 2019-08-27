import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthService } from "./../_services/auth.service";
import { UsersService } from "./../_services/users.service";

import { NavComponent } from "./../nav.component";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth:any
  type:any = 'Promotor';
  @Input() public isModal: boolean;
  @Input() public foreignId: number;
  @Input() public idBis: string;
  @BlockUI() blockUI: NgBlockUI;
  explorer:boolean = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private UserService: UsersService,
    private _service: NotificationsService,
    private nav:NavComponent
  ) { }
  getParams(){
    this.type = this.route.snapshot.paramMap.get("type");
    // console.log(this.type);

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
      this._service.success('¡Éxito!',success)

}
createError(error) {
      this._service.error('¡Error!',error)

}

  login(formValue:any){
    this.blockUI.start();
      this.authenticationService.Authentication(formValue)
        .then(response => {
          this.auth = response
            if(response.state){
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
            setTimeout(element=>{
              $("#rouded-profile").attr("src",response.foto?response.foto:localStorage.getItem('currentAvatar'));
            },500);

                this.blockUI.stop();
                this.blockUI.stop();
                // console.log(response);
                setTimeout(() => {
                $("#loginModal").modal('hide');

                }, 100);
                $("#loginModal").modal('hide');

                setTimeout(() => {
                  $("#loginModal").modal('hide');

                  this.router.navigate([`./bandas`])
                }, 200);
                this.blockUI.stop();
                this.nav.fullSession(true)
          }else{

                this.blockUI.stop();
            this.createError("Su usuario se encuentra deshabilitado temporalmente")
            setTimeout(() => {
                this.blockUI.stop();
            }, 500);
            // console.log(response);
          }
        }).catch(error => {
            console.clear

            this.blockUI.stop();
          if(error.status==401){
            this.createError("Usuario o Clave incorrectas");
          }else{
            this.createError("Error: please call to support")
            console.log(error);

          }
          setTimeout(() => {
                this.blockUI.stop();
          }, 500);

        })


    }
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    if(this.getInternetExplorerVersion()>(-1)){
      this.explorer = true
    }

    if(this.explorer){
      console.log("Esta pagina funciona mejor en otro EXPLORADOR, no en este!");

    }
    // this.getParams()
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
