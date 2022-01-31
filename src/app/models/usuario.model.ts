import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre:string,
        public email:string,
        public password?: string,
        public img?:string,
        public google?:boolean,
        public role?:string,
        public uid?: string,
    ){}

    // para poder acceder a todos los metodos de una clase recuerda que tienes que instanciarla
    impirmirUsuario(){
        console.log(this.nombre);
    }
    // retornando la url de la imagen localhost:3005/api/upload/usuarios/no-image
    get imagenUrl(){
        
        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            // validando la imagen de un usuario autenticado por google
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }
}