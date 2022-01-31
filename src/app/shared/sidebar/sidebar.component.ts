import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  // imgUrl:string = '';
  usuario:Usuario
  constructor( private sidebarService: SidebarService,private usuarioService:UsuarioService ) {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);
    // this.imgUrl = usuarioService.usuario.imagenUrl
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
