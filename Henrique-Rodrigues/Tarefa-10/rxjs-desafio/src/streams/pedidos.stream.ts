import { catchError, Observable, scan, share, retry, of, filter } from "rxjs";
import { interval } from "rxjs";
import { criaDadosPedido } from "../utils/simulador.js";
import type { dadosPedido, statusPedido } from "../utils/simulador.js";


export const pedidos$ = new Observable<dadosPedido>((Subscriber) =>{
    const intervalo = interval(2000).subscribe(() => { 
        const erro = Math.random();
        if (erro < 0.1) {
            Subscriber.error(new Error('Falha na comunicação com o servidor'))
        }
        const dadosPed = criaDadosPedido();
        Subscriber.next(dadosPed);
    });
    return () => intervalo.unsubscribe();
}).pipe(share(),);

export const statusCount$ = pedidos$.pipe(
  filter((dadosPed): dadosPed is dadosPedido => !('mensagem' in dadosPed)),
  scan<dadosPedido, Record<statusPedido, number>>((acc, dadosPed) => {
    const status = dadosPed.status;
    acc[status] = (acc[status] || 0) + 1;
    return {...acc};
  }, {} as Record<statusPedido, number>),
);
