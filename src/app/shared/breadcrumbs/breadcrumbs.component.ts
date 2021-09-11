import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo: string = '';
  public tituloSubs$!: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({titulo}) => {
      this.titulo = titulo
      // console.log('este es el titulo',this.titulo);
      // cambiamos el titulo de la pestaña de la pagina
      document.title =`AdminPro - ${this.titulo}`;
    });
    
   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
   getArgumentosRuta(){
     // el events es un observable que emite eventos
    return this.router.events
    .pipe(
      // ActivationEnd es una clase la que nos sirve para tener un tipado
      // instanceof Devuelve true si obj pertenece a la Class o una clase que hereda de ella. event = a nuestro evento
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      // recuerda este filtro solo aplica al de arriba por que es ejecucion en cascada
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      // extrayendo la data
      map((event:ActivationEnd) => event.snapshot.data)
    );

   }

  ngOnInit(): void {
  }

}
