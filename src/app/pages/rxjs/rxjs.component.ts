import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'; // a qui podemos encontrar macros o funciones que nos ayudan a generar obsva
import { filter, map, retry, take } from 'rxjs/operators'; // a qui podemos encontrar como piezas de lego que nos permiten conectar con observables o encadenarse entre si

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy{
  public intervalSubs:Subscription;
  constructor() {
    
    // a qui me suscribo a mi observer
    // this.retornaObservable().pipe(
    //   // retry intentara ejecutar dos veces el procceso
    //   retry(2)
    // ).subscribe(
    //   (valor) => console.log('Subs', valor),
    //   (error) => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );
    this.intervalSubs =  this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    // terminamos el obs que siempre estan emitiendo valores 
    this.intervalSubs.unsubscribe();
  }
  // el operador map nos sirve para transformar la informacion que recive del observable y mutarla de la manera que yo necesite el map recive el argumento que el obs padre emita 
  retornaIntervalo():Observable<number>{
    return interval(1000).pipe(
      // en este caso valor toma el valor de 0 
      map(valor => valor + 1), // 0 => 1,
      // si el resultado es 0 lo dejas pasar (true) si es diferente no (false)
      filter(valor => (valor % 2 === 0) ? true : false),
      // el take es cuantas veces se va a repetir y es muy importante donde lo colocas ejemplo si lo colocas al inicio te mostrara hasta el valor 10, pero si lo colocas al final mostrara hasta el valor 20 por la validacion del filter si es false no lo deja pasar al take  
      take(5),
    );
    
  }
  retornaObservable():Observable<number>{
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        // observer es mi parametro y next es el valor siguiente  que quiero emitir
        observer.next(i);

        if (i === 4) {
          // esto es para cancelar el intervalo y es propio de js
          clearInterval(intervalo);
          // para ya no escuchar mas valor lo terminamos
          observer.complete();
        }
        if(i === 2){
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
    return obs$
  }
}
