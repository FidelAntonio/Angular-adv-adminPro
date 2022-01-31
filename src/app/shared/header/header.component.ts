import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  // propiedad de una clase
  // public imgUrl: string = '';
  public usuario: Usuario;
  constructor(private usuarioService:UsuarioService) { 
    // como estamos accediendo desde el constructor el this del servicio no hace falta recuerda estamos accediento a una instancia del modelo de usuario que tenemos en el servicio linea 19 y como es un get no es necesario los parentesis
    // this.imgUrl = usuarioService.usuario.imagenUrl;
    // esto es una instancia
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }
  logOut(){
    this.usuarioService.logOut();
  }
}
