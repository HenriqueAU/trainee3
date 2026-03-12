import { combineLatest, map, Observable } from "rxjs";
import { interval, filter, share } from "rxjs";
import { criaDadosEnt } from "../utils/simulador.js"
import type { dadosEntregador, painel, statusPedido } from "../utils/simulador.js";
import { pedidos$ } from "./pedidos.stream.js";

export const gps$ = new Observable<dadosEntregador>((Subscriber) =>{
    const intervalo = interval(1000).subscribe(() => {
        const dadosEnt = criaDadosEnt();
        Subscriber.next(dadosEnt);       
    });
    return () => intervalo.unsubscribe(); 
}).pipe(share());

export const velocidadeSuspeita$ = gps$.pipe(filter(dadosEnt => dadosEnt.velocidade > 60 ));

export const gpsEnriquecido$ = gps$.pipe(map(dadosEnt => ({
    ...dadosEnt,
    regiao: dadosEnt.lat > 0 ? 'norte' : 'sul'
}))
);

export const painelEntregador$ = combineLatest([gps$, pedidos$]).pipe(
  map(([dadosEnt, dadosPed]) => {
    if (dadosEnt.entregadorId === dadosPed.entregadorId) {
      return {
        entregadorId: dadosEnt.entregadorId,
        ultimaLocalizacao: {
          lat: dadosEnt.lat,
          lng: dadosEnt.lng,
          velocidade: dadosEnt.velocidade
        },
        ultimoStatus: dadosPed.status,
        ultimaAtualizacao: new Date()
      };
    }
    return null;
  }),
  filter(
    (painel): painel is {
      entregadorId: string;
      ultimaLocalizacao: { lat: number; lng: number; velocidade: number };
      ultimoStatus: statusPedido;
      ultimaAtualizacao: Date;
    } => painel !== null
  )
);