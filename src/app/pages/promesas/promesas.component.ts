import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // llamando a la promesa
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
    // Nota el codigo se ejecuta de manera secuencial
    // una promesa no es asincrona en si, lo que es asincrono es la resolucion then()
    // cuando la promesa es satisfactoria se manda un resolve
    // cuando esta mal se manda un reject
    //   const promesa = new Promise( (resolve, reject) => {

    //     if(false){

    //       resolve("soy una promesa asincrona la resolucion es la parte asincrona, sin la resolucion seria ejecutada de forma secuencial ");
    //     }else{
    //       reject('Algo salio mal');
    //     }

    //   });
    //   //obteneiendo la informacion del solve mediante el then
    // esta parte es la asincrona de una promesa
    //   // para obtener el producto del resolve mandamos un parametro donde vendra la repuesta
    //   promesa.then((mensaje) => {
    //     console.log(mensaje);
    //   })
    //   // obteniendo el error
    //   .catch(error => console.log('Error en mi promesa',error))
    //   console.log('Fin del init');
  }

  getUsuarios() {
    return new Promise((resolve) => {
      // solicitud 
      fetch('https://reqres.in/api/users?page=2')
      // cuando obtenemos el cuerpo de la respuesta se ejecuta esta linea y esto tambien regresa una promesa
        .then((resp) => resp.json())
        // y por eso encadenamos otra promersa Y SOLVE ES el que me regresa la data
        .then((body) => resolve(body.data));
    });
  }
}
