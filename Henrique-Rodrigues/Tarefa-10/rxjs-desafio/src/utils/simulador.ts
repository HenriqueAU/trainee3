const idsEntregador: string[] = [  
  "ENT-001", "ENT-002", "ENT-003", "ENT-004",
  "ENT-005", "ENT-006", "ENT-007", "ENT-008",
  "ENT-009", "ENT-010", "ENT-011", "ENT-012",
  "ENT-013", "ENT-014", "ENT-015", "ENT-016",
  "ENT-017", "ENT-018", "ENT-019", "ENT-020"
];

const idPedidos = [
  "PED-001", "PED-002", "PED-003", "PED-004", "PED-005",
  "PED-006", "PED-007", "PED-008", "PED-009", "PED-010",
  "PED-011", "PED-012", "PED-013", "PED-014", "PED-015",
  "PED-016", "PED-017", "PED-018", "PED-019", "PED-020",
  "PED-021", "PED-022", "PED-023", "PED-024", "PED-025",
  "PED-026", "PED-027", "PED-028", "PED-029", "PED-030",
  "PED-031", "PED-032", "PED-033", "PED-034", "PED-035",
  "PED-036", "PED-037", "PED-038", "PED-039", "PED-040"
];

export interface dadosEntregador {
    entregadorId: string;
    lat: number;
    lng: number;
    velocidade: number;
    timestampent: Date;
};


const statusPedidos = ['coletado', 'em_rota', 'entregue', 'falhou'] as const;
export type statusPedido = typeof statusPedidos[number];

export interface dadosPedido{
    pedidosId: string,
    entregadorId: string;
    timestampped: Date,
    status: statusPedido,
};

const tipos = ['atraso', 'veiculo_parado', 'rota_desviada'] as const;
const severidades = ['baixa', 'media', 'alta'] as const;
type tipo = typeof tipos[number];
type severidade = typeof severidades[number];

export interface dadosAlerta{
    mensagem: string;
    tipo: tipo;
    entregadorId: string;
    severidade: severidade;
};

export interface Emergencia {
  entregadorId: string;
  criaDadosAlerta: dadosAlerta;
  dadosEnt: dadosEntregador;

};

export interface painel {
  entregadorId: string;
  ultimaLocalizacao: {lat: number; lng: number; velocidade: number;};
  ultimoStatus: statusPedido;
  ultimaAtualizacao: Date;
}

export function criaDadosEnt(): dadosEntregador{
    const dadosEnt = {
        entregadorId: idsEntregador[Math.floor(Math.random() * idsEntregador.length )]!,
        lat: Math.floor(Math.random() * 180 -90),
        lng: Math.floor(Math.random() * 180 -90),
        velocidade: Math.floor(Math.random() * 81),
        timestampent: new Date(),
    };
    return dadosEnt;
};

export function criaDadosPedido(): dadosPedido{
    const dadosPed = {
    pedidosId: idPedidos[Math.floor(Math.random() * idPedidos.length)]!,
    entregadorId: idsEntregador[Math.floor(Math.random() * idsEntregador.length )]!,
    timestampped: new Date(),
    status: statusPedidos[Math.floor(Math.random() * statusPedidos.length)]!,
    }
    return dadosPed
};

export function criaDadosAlerta(): dadosAlerta{
    const dadosAle = {
        mensagem: 'genérico',
        tipo: tipos[Math.floor(Math.random() * tipos.length)]!,
        entregadorId: idsEntregador[Math.floor(Math.random() * idsEntregador.length )]!,
        severidade: severidades[Math.floor(Math.random() * severidades.length)]!, 
    }
 return dadosAle;
}

export function geraValorNoIntervalo(x: number, y: number) {
    const min = Math.min(x, y);
    const max = Math.max(x, y);
    return Math.floor(Math.random() * (max -  min) + min);
};
