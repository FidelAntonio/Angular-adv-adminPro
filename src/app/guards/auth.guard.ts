import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // para utilizar un servicio hay que inyectarlo
  constructor(private usuarioService: UsuarioService,
              private router:Router){}
  canActivate(
    //ruta que queremos abiri
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)  {
    // console.log('paso por el canActivate del guard');
    // como ya combertimos el resultado en un boolean y recuerda que esto tiene que regresar un true o un false = invalido
    //lo que retorna es el producto de esta peticion hace todo el subscribe etc
    return this.usuarioService.ValidarToken().pipe(
      // recuerda que el tap es un efecto secundario y podemos hacer lo que queramos
      tap(estaAutenticado =>{
        if(!estaAutenticado){
          // si no esta autenticado lo sacamos
          this.router.navigateByUrl('/login');
        }
      })
    );
    ;
  }
  
}
