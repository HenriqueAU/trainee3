# Desafio RxJS
------------------------------------------------------------------------

# Como Rodar o Projeto
## 1. Instalar dependências

``` bash
npm install
```

## 2. Iniciar o projeto

``` bash
npm run start
```

------------------------------------------------------------------------

# Streams do Sistema

O projeto utiliza **RxJS** para criar **streams reativos** que simulam
eventos de um sistema de logística.

------------------------------------------------------------------------

## Alertas

**Stream:** `alertas$`

Emite alertas com diferentes níveis de severidade:

-   **baixa**
-   **média**
-   **alta**

**Intervalo de emissão:**\
Entre **3 e 8 segundos (aleatório)**.

**Funcionamento:**

Um `timeout` gera novos dados aleatórios e os emite continuamente.
Uma nova variável foi criada para receber o identificador de `timeout` que possamos matar a execução do intervalo junto com a subscription

------------------------------------------------------------------------

## GPS

**Stream:** `gps$`

Emite dados do entregador contendo:

-   localização
-   velocidade

**Intervalo de emissão:**

A cada **1 segundo**.

**Funcionamento:**

Utiliza o operador:

`interval()`

para gerar eventos periódicos.

------------------------------------------------------------------------

## Pedidos

**Stream:** `pedidos$`

Emite pedidos automaticamente.

**Intervalo:**

A cada **2 segundos**.

**Características:**

-   geração contínua de pedidos
-   **10% de chance de erro**
-   suporte a **retry**
-   tratamento com **catchError**

Isso permite testar **resiliência do fluxo de dados**.

------------------------------------------------------------------------

## Velocidade Suspeita

**Stream:** `velocidadeSuspeita$`

Filtra os dados do GPS para encontrar entregadores com velocidade:

**maior que 60 km/h**.

**Operador utilizado:**

`filter()`

------------------------------------------------------------------------

## GPS Enriquecido

**Stream:** `gpsEnriquecido$`

Adiciona informação de **região** aos dados do GPS.

Regiões possíveis:

-   **norte**
-   **sul**

**Operador utilizado:**

`map()`

A classificação é feita com base na **latitude**.

------------------------------------------------------------------------

## Alertas Críticos

**Stream:** `alertasCriticos$`

Filtra alertas com severidade:

-   **média**
-   **alta**

------------------------------------------------------------------------

## Emergência

**Stream:** `emergencia$`

Dispara um evento quando ocorre:

-   um **alerta de severidade alta**
-   um **GPS do mesmo entregador**
-   com velocidade **acima de 60 km/h**

**Operador utilizado:**

`withLatestFrom()`

Esse operador permite combinar eventos de diferentes streams.

------------------------------------------------------------------------

## Painel Entregador

**Stream:** `painelEntregador$`

-   combina as streams `gps$` e `pedidos$`
-   sempre que qualquer um desses streams emitir uma informação, um novo objeto será emitido com os dados mais recentes
-   não consegui resolver o erro onde `pedidos$` retorna dois tipos dadosPedido || erro e o código não roda, pois a stream não está preparada pro segundo tipo

------------------------------------------------------------------------

# Justificativa para o operador escolhido na tarefa 3.1

-   Foi escolhido um operador combineLatest, esse operador emite um novo valor sempre que qualquer um dos streams atualizar, utilizando os dados mais recentes de ambos.
-   O filter foi usado para remover valores nulos 

# Qual o processo de pensamento para a tarefa 3.2

-   Primeiro, identificar as duas condições (aleta === 'alto' e velocidade > 60)
-   Correlacionar uma stream que já cumpria a condição dois com uma condição da nova stream
-   Caso as duas ocorram dentro de 5 segundos, e verificando se pertecem ao mesmo ID emitir um novo evento
-   Não consegui fazer a relação 'caso as duas ocorram dentro de 5 segundos'
-   Somente filtrar e emitir caso as duas condições sejam cumpridas

# Uma dificuldade

-   Uma dificuldade inicial foi entender melhor como alguns operadores dentro do `pipe` funcionam e como eles transformam os dados ao longo do fluxo do stream.
-   Outra dificuldade foi compreender como relacionar eventos de duas streams diferentes e verificar se eles ocorrem dentro de um mesmo intervalo de tempo (no caso, 5 segundos) para o mesmo entregador.

------------------------------------------------------------------------
