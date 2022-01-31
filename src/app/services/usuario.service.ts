import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2:any;
  public usuario!: Usuario;
  constructor(private http: HttpClient,private router:Router,private ngZone:NgZone) {
    // los servicios en angular son singleton es decir  solo se va a ejecutar una unica vez cada vez que se recarga la aplicacion completamente o cuando entre por primera vez a la aplicacion
    this.initGoogle();
  }
  // es mejor hacer el get que estar declarando  el token a cada rato
  get token():string{
    return localStorage.getItem('token') || '';
  }
  get uid():string {
    return this.usuario.uid || '';
  }
  initGoogle(){
     // las promesas siempre se van a ejecutar
     return new Promise<void>(resolve =>{

       gapi.load('auth2', () => {
         this.auth2 = gapi.auth2.init({
           client_id: '799880468497-f9h9s6i83pk3ehump3m8fq2vedn6q6ro.apps.googleusercontent.com',
           cookiepolicy: 'single_host_origin',
         });
        //  exponiendole
        // resolve(this.auth2);
         resolve();
       });
     })
  }
  logOut(){
    localStorage.removeItem('token');
    // como signOut es una libreria externa y estaba llamando al router por eso marca una advertencia para poder quitarla utilizamos ngZone
    this.auth2.signOut().then(()=>{
      // el ng zone nos permite manejar la instancia global de angular la que esta corriendo y poder ejecutar procesos de angular anque se ejecuenten fuera del mismo por que la libreria de google esta haciendo la navegacion a nuestra aplicacion
      this.ngZone.run(()=>{

        this.router.navigateByUrl('/login')
      })
    });
  }
  // validar token
  ValidarToken():Observable<boolean>{
    // const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{
        // desestructurando el obj
        const {nombre,email,img = '',google,role,uid} = resp.usuario;
        // creando la instancia de usuario
        this.usuario = new Usuario(nombre,email,'',img ,google,role,uid);
        this.usuario.impirmirUsuario();
        // guardando el nuevo token en el localStorage
        localStorage.setItem('token', resp.token);
        return true
      }),
      // convirtiendo la resp en un booleano
      // map(reps=> true),
      // capturamos el error y lo combertimos en un obs y quiere decir que no logro la autentificacion
      catchError(error => {
        console.log(error);
        return of(false)
      })
    )
  }
  crearUsuario(formData: RegisterForm) {
    console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        // guardando en el local
        localStorage.setItem('token', resp.token);
      })
    );
  }
// se puede hacer esta esta forma o crear su interface
  actualizarPerfil(data:{usuario:string,email:string,role:string}){
    data={
      ...data,// todo lo que tenga data usuario y email que vienen del form
      role: this.usuario.role // y aqui le agrego otra propiedad
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,{
      headers:{
        'x-token':this.token
      }
    })
  }

  login(formData: LoginForm) {
    console.log('login usuario');
    return (
      this.http
        .post(`${base_url}/login`, formData)
        // lo que hace el pipe es poder utilizar el operador tap el cual es el resultado del observable esto this.http.post(`${base_url}/login`, formData) literalmente responde lo de la peticion
        .pipe(
          tap((resp: any) => {
            // guardando en el local
            localStorage.setItem('token', resp.token);
          })
        )
    );
  }
  loginGoogle(token:any) {
    console.log('login usuario',token);
    return (
      this.http
      // el token es un obj por eso  esta entre {}
        .post(`${base_url}/login/google`, {token})
        .pipe(
          tap((resp: any) => {
            // guardando en el local storage
            localStorage.setItem('token', resp.token);
          })
        )
    );
  }
}
