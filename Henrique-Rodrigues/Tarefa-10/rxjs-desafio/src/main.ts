import { gps$, gpsEnriquecido$, velocidadeSuspeita$, painelEntregador$ } from "./streams/gps.stream.js";
import { pedidos$, statusCount$ } from "./streams/pedidos.stream.js";
import { alertas$, alertasCriticos$, emergencia$ } from "./streams/alertas.stream.js";
import { Subject, timer, takeUntil, retry, catchError, of } from "rxjs";
import { logComTimeStamp } from "./operadores/custom.operadores.js";

const destroy$ = new Subject<void>();

timer(30000).subscribe(() => {
    destroy$.next();
    destroy$.complete();
});

let gpsCount = 0;
let velocidadeSuspeitaCount = 0;
let gpsEnriquecidoCount = 0;
let pedidosCount = 0;
let statusCountCount = 0;
let alertasCount = 0;
let alertasCriticosCount = 0;
let painelCount = 0;
let emergenciaCount = 0;


gps$.pipe(logComTimeStamp('GPS'),
takeUntil(destroy$)).subscribe({
  next(dadosEnt) {
    gpsCount++;
    console.log(dadosEnt);
  },
  complete() {
    console.log('gps$ finalizado');
    console.log('Total de eventos gps$:', gpsCount);
  }
}); 

velocidadeSuspeita$.pipe(takeUntil(destroy$)).subscribe({
  next(dadosEnt) {
    velocidadeSuspeitaCount++;
    console.log('Veículo em velocidade suspeita:', dadosEnt);
  },
  complete() {
    console.log('velocidadeSuspeita$ finalizado');
    console.log('Total de eventos velocidadeSuspeita$:', velocidadeSuspeitaCount);
  }
});


gpsEnriquecido$.pipe(logComTimeStamp('GPS+'),
takeUntil(destroy$)).subscribe({
  next(dadosEnt) {
    gpsEnriquecidoCount++;
    console.log(dadosEnt);
  },
  complete() {
    console.log('gpsEnriquecido$ finalizado');
    console.log('Total de eventos gpsEnriquecido$:', gpsEnriquecidoCount);
  }
});

pedidos$.pipe(logComTimeStamp('PEDIDOS'),
    takeUntil(destroy$),
    retry(3),
    catchError(err =>
      of({
        status: 'erro',
        mensagem: 'Um erro foi encontrado'
      })
    )
  )
  .subscribe({
    next(dadosPed) {
      pedidosCount++;
      console.log(dadosPed);
    },
    complete() {
      console.log('pedidos$ finalizado');
      console.log('Total de eventos pedidos$:', pedidosCount);
    }
  });

statusCount$.pipe(logComTimeStamp('PEDIDOS CONTADOR'),
takeUntil(destroy$)).subscribe({
  next(acc) {
    statusCountCount++;
    console.log('Acumuladores:', acc);
  },
  complete() {
    console.log('statusCount$ finalizado');
    console.log('Total de eventos statusCount$:', statusCountCount);
  }
});

alertas$.pipe(logComTimeStamp('ALERTAS'),
takeUntil(destroy$)).subscribe({
  next(dadosAle) {
    alertasCount++;
    console.log(dadosAle);
  },
  complete() {
    console.log('alertas$ finalizado');
    console.log('Total de eventos alertas$:', alertasCount);
  }
});

alertasCriticos$.pipe(logComTimeStamp('ALERTA CRITICO'),
takeUntil(destroy$)).subscribe({
  next(dadosAle) {
    alertasCriticosCount++;
    console.log('Alerta crítico:', dadosAle);
  },
  complete() {
    console.log('alertasCriticos$ finalizado');
    console.log('Total de eventos alertasCriticos$:', alertasCriticosCount);
  }
}); 

painelEntregador$.pipe(logComTimeStamp('PAINEL'),
    takeUntil(destroy$)).subscribe({
    next(painel) {
      painelCount++;

      console.log('Entregador:', painel.entregadorId);
      console.log('Localização:', painel.ultimaLocalizacao);
      console.log('Status do pedido:', painel.ultimoStatus);
      console.log('Última atualização:', painel.ultimaAtualizacao);
    },
    complete() {
      console.log('painelEntregador$ finalizado');
      console.log('Total de eventos painelEntregador$:', painelCount);
    }
  });

emergencia$.pipe(logComTimeStamp('EMERGENCIA'),
  takeUntil(destroy$)).subscribe({
  next(emergencia) {
    emergenciaCount++;
    console.log('Emergência detectada para entregador:', emergencia.entregadorId);
    console.log('Alerta crítico:', emergencia.criaDadosAlerta);
    console.log('Dados de GPS:', emergencia.dadosEnt);
  },
  complete() {
    console.log('emergencia$ finalizado');
    console.log('Total de eventos emergencia$:', emergenciaCount);
  }
});