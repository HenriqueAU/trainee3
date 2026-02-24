type User = {
  id: number;
  nome: string;
  idade: number;
};

const Users: User[] = [
  { id: 1, nome: 'Henrique', idade: 22 },
  { id: 2, nome: 'Segundo Usuário', idade: 30 },
];

function buscarUser(id: number, delay: number): Promise<User | undefined> {
  console.log('Iniciando função buscarUser');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = Users.find(u => u.id === id);
      console.log('Devolvendo o resultado user');
      if (!user) {
        reject(new Error('Usuário não encontrado'));
      } else {
      resolve(user);
      console.log(user)
      }
    }, delay);
  });
}

/*
//Primeiro teste, mostrando como a promise funciona
//É resolvida mesmo sem ver o resultado
const p1 = buscarUser(1, 2000);
console.log("Promise 1:", p1);
*/

/*
//Chama 1 primeiro, resolve 2 antes
//Async: mesmo 1 sendo chamada antes, devido ao tempo de resposta simulado pelo delay, 2 é devolvido antes
//Await: mesmo 2 resolvendo primeiro, o fluxo só continua após a resolução de p1, mas como 2 já foi resolvido não tem o tempo de espera do delay
//Caso remova o await, as promises são resolvidas normalmente, mas como não há um await o resultado não é observado
async function main() {
  console.log("Chamando usuário 1");
  const p1 = buscarUser(1, 3000);

  console.log("Chamando usuário 2");
  const p2 = buscarUser(2, 1000); 

  console.log("Promises", p1, p2);

  const user1 = await p1;
  console.log("Resultado user 1:", user1);

  const user2 = await p2;
  console.log("Resultado user 2:", user2);
}
main(); 
*/

/*
//Devolvendo em tempo de execução
async function main1() {
  console.log("Chamando usuário 1");
  const p1 = buscarUser(1, 3000);

  console.log("Chamando usuário 2");
  const p2 = buscarUser(2, 1000); 

  console.log("Promises", p1, p2);

  p1.then(u => console.log("User 1:", u));

  p2.then(u => console.log("User 2:", u));    
}
main1(); 
*/

/*
//Sequencial, cria fila de execução, executa u1 primeiro, espera terminar e executa u2
async function sequencial() {
  console.time("sequencial");
  const u1 = await buscarUser(1, 3000);
  const u2 = await buscarUser(2, 1000);
  console.timeEnd("sequencial");
}
sequencial();
*/

/*
//Concorrente, não cria fila, executa ambos, u2 finalizando a execução primeiro, mas aguarda u1 finalizar pra devolver o resultado
async function concorrente() {
  console.time("concorrente");
  const p1 = buscarUser(1, 3000);
  const p2 = buscarUser(2, 1000);
  await p1;
  await p2;
  console.timeEnd("concorrente");
}
concorrente();
*/

/*
//Teste com resultado já resolvido, await sempre joga pra uma microtask, então b é resolvido primeiro por causa da prioridade do event loop
async function teste() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("A");
teste();
console.log("B");
*/

/*
//Visualização do event loop: A e D são resolvidas primeiro, then vira microtask então é resolvido após A e D, C vira macrotask, então é resolvido depois de tudo
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

setTimeout(() => {
  console.log("C");
}, 0);

console.log("D");
*/

/*
//Promisse.all: busac tudo ou nada, se um falhar, tudo falha
async function all() {
  await Promise.all([
  buscarUser(1, 3000),
  buscarUser(99, 1000)
]);
}
*/

/*
//Promise.race: primeiro resultado, sendo sucesso ou erro. Ele não mata outras execuções, apenas ignora, então o buscarUser 1 continua sendo executado em segundo plano
async function race() {

 const primeiro = await Promise.race([
  buscarUser(1, 3000),
  buscarUser(2, 1000)
 ]);

 console.log("Primeiro resolvido:", primeiro);
}
race();
*/