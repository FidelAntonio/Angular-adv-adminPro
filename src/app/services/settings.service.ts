import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
 // seleccionamos el id entonces se coloca es # y obtenemos todo el link que viene desde el index.html
  private linkTheme = document.querySelector('#theme');
   // tolos los li tiene un clase selector entonces con esto seleccionamos todos
  //  public links:NodeListOf<Element> = document.querySelectorAll('.selector');

  constructor() { 

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href',url);
  }
  // preocedimiento para cambiar el tema
  changeTheme(theme: string){
    // console.log(theme); a qui obtenemos el color del thema
    const url = `./assets/css/colors/${theme}.css`
    // console.log(linkTheme);
    // cambiamos el href por url primero el atributo que queremos cambiar despues va por lo que lo cambiaremos
    this.linkTheme?.setAttribute('href',url);
    // grabando en el localStorage recuerda que primero va el nombre y despues el valor que almaceno
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }
    // colocando el check de acuerdo a lo que seleccione el usuario
    checkCurrentTheme(){
      const links: NodeListOf<Element> =  document.querySelectorAll('.selector');
      
      // console.log(links);
      // recoriendo la lista de elementos de html
      // en mi variable elemn se guarda cada uno de los elemntos de la lista
      links.forEach(elem =>{
        // borrando la clase de working
        elem.classList.remove('working');
        // obteniendo el valor  del atributo personalizado
        const btnTheme = elem.getAttribute('data-theme');
        // construyendo la url 
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        // asignandole la url a currentheme
        const currentTheme = this.linkTheme?.getAttribute('href');
        // console.log("curentThemeaaa",currentTheme);
        if(btnThemeUrl === currentTheme ){
          elem.classList.add('working');
        }
  
  
      })
    }
}
