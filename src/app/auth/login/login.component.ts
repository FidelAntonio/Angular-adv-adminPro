import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;
  public loginForm = this.fb.group({
   
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password: ['',[Validators.required, ]],
    remember: [false]
   
  });

  constructor(private router: Router,private fb: FormBuilder,private userService: UsuarioService,private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }
  login(){
    // viendo los valores del formulario
    console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
    this.userService.login(this.loginForm.value).subscribe(resp => {
      // console.log(resp);
      // grabando en el local el email si activan el remember
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      }else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');

    }, (err)=> {
      Swal.fire('Error', err.error.msg,'error');
    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
  
  async startApp() {
   // esperando que esto se haga ya que es una promesa
    await this.userService.initGoogle();
    // necesitamos la instancia y accedemos mediante al servicio y ya deberia de estar inicializada
    this.auth2 = this.userService.auth2;
    this.attachSignin( document.getElementById('my-signin2') );

    
  };
   // attachSignin(element:any) {
  //   console.log(element.id);
  //   this.auth2.attachClickHandler(element, {},
  //       (googleUser:any) =>{
  //         const id_token = googleUser.getAutResponse().id_token;
  //         // console.log(id_token);
  //         this.userService.loginGoogle(id_token).subscribe();
  //       }, (error:any) => {
  //         alert(JSON.stringify(error, undefined, 2));
  //       });
  // }
  attachSignin( element:any ) {
    this.auth2.attachClickHandler( element, {}, (googleUser:any) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe(resp =>{
        this.ngZone.run(()=>{

          this.router.navigateByUrl('/');
        })
      });
    },(error:any)=>{
      alert(JSON.stringify(error,undefined,2))
    });
  }



}
