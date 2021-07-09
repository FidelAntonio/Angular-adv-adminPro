import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    // concatenando el btn a la clase
    this.btnClass = `btn ${this.btnClass}`;
  }
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  // para recivir informacion desde nuestro padre
  // con esto le indicamos que podemos recivir una propiedad desde el padre llamada progreso
  // @Input() progreso: number = 40;
  // asi podemos renombrar
  @Input('valor') progreso: number = 40;
  // cambio el color de los btn de manera condicional
  @Input() btnClass: string = ' btn-primary';

  // emitir un evento
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  // get getPorcentage(){
  //   return `${this.progreso}%`;
  // }

  cambiarValor(valor: number) {
    const aux = this.progreso + valor;

    // validando que el porcentage no pase mayor a 100 y menor a 0
    if (aux > 100 || aux < 0) {
      return;
    }
    this.progreso = aux;
    this.valorSalida.emit(this.progreso);

    // console.log(this.progreso);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      nuevoValor = 100;
    } else if (nuevoValor <= 0) {
      nuevoValor = 0;
    }

    this.valorSalida.emit(nuevoValor);
  }
}
