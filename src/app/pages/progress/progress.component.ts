import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent {

  progreso1 = 25;
  progreso2 = 35
  
  get getProgreso1(){
    return `${this.progreso1}%`;
  }

  get getProgreso2(){
    return `${this.progreso2}%`;
  }

  // que hacer cuando se reciva ese evento que viene del hijo
  // podemos hacerlo de esta forma pero tendriamos que crear esta funcion por cada progreso que tuvieramos
  // cambioValorHijo(valor: number){
  //   this.progreso1 = valor;
  //   console.log("hey!!!",valor);
  // }
}
