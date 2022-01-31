import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario; // a qui obtengo todos los datos del usuario es mas corto que hacerlo con el servicio
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }
  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe((resp) => {
        console.log('resp', resp);
        // extrayendo los datos que necesito del formulario
        const { nombre, email } = this.perfilForm.value;
        // asignando los datos de mi instancia para que se actualicen en tiempo real en todos los lados donde este llamando a usuario como pasan por referencia
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado','Cambios fueron guardados','success');
      },(err)=>{
        Swal.fire('Ops',err.error.msg,'error');
        // console.log('error',err.error);
      });
  }

  cambiarImagen(event){
    if(!event.target.files[0]){
      this.imagenSubir = null;
      return this.imgTemp = null;
    } else {
      const file = event.target.files[0];
      this.imagenSubir = file;
 
      const reader = new FileReader();
      reader.readAsDataURL(file);
 
      reader.onloadend = () => {
         this.imgTemp = reader.result;
      }
    }
  }
  subirImagenT() {
    this.fileUploadService
      .actualizarFotoT(this.imagenSubir, 'usuarios', this.usuario.uid)
      .subscribe((resp:any) => {
        this.usuario.img = resp.nombreArchivo;
        Swal.fire('Guardado',resp.msg,'success');
        
      },(err)=>{
        Swal.fire('Ops','Error inesperado','error');

      });
  }
  // esto es una verison con javaScript puro
  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img) => {
        console.log(img);
        // asignando la nueva imgane y que se cambie en tiempo real
        this.usuario.img = img;
        Swal.fire('Guardado','Imagen de usuario actualizado','success');
        
      }).catch(err =>{
        Swal.fire('Error','No se pudo subir la imagen','error');
        
        // Swal.fire('Guardado','Imagen de usuario actualizado','success');
      });
  }
  
}
