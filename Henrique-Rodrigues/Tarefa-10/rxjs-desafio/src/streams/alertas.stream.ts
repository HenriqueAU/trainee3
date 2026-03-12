import { filter, Observable, share,  pipe, withLatestFrom, map } from "rxjs";
import type { dadosAlerta } from "../utils/simulador.js";
import { criaDadosAlerta, geraValorNoIntervalo } from "../utils/simulador.js";
import { velocidadeSuspeita$ } from "./gps.stream.js";
import type { dadosEntregador, Emergencia } from "../utils/simulador.js";

export const alertas$ = new Observable<dadosAlerta>((Subscriber) =>{
    let timeoutRef: ReturnType<typeof setTimeout>;
    const intervalo = () => {
        const intervaloAleatorio = geraValorNoIntervalo(3000, 8000);
        console.log('Próximo intervalo:', intervaloAleatorio);
        timeoutRef = setTimeout(intervalo, intervaloAleatorio);
        Subscriber.next(criaDadosAlerta());      
    };
    intervalo();   
    return () => clearTimeout(timeoutRef);
}).pipe(share());

export const alertasCriticos$ = alertas$.pipe(filter(dadosAle => ['media', 'alta'].includes(dadosAle.severidade)))

export const emergencia$: Observable<Emergencia> = alertas$.pipe(filter((criaDadosAlerta: dadosAlerta) => criaDadosAlerta.severidade === 'alta'), //criaDadosAlerta recebe apenas o que a severidade for 'alta'
    withLatestFrom(velocidadeSuspeita$),
    filter(([criaDadosAlerta, dadosEnt]) => criaDadosAlerta.entregadorId === dadosEnt.entregadorId),
    map(([criaDadosAlerta, dadosEnt]: [dadosAlerta, dadosEntregador]) => ({entregadorId: criaDadosAlerta.entregadorId, criaDadosAlerta, dadosEnt}))
);

//Não funciona
/*
const intervalo = timer(0, 3000).pipe(
  switchMap(() => {
    const delay = geraValorNoIntervalo(3000, 8000);
    return of(0, delay); 
  })
).subscribe(() => {
    const dadosAle = criaDadosAlerta();
    Subscriber.next(dadosAle);
});*/

