Para testar os comandos seguir o passo a passo:

GET: Acessar o URL http://localhost:3000/users ou http://localhost:3000/users/id

POST: Abrir um novo terminal git bash e executar o comando:
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Usuário4","email":"usuario4@email.com"}'

PUT: Abrir um novo terminal git bash e executar o comando:
curl -X PUT http://localhost:3000/users/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"Nome Atualizado"}'

DELETE: curl -X DELETE http://localhost:3000/users/2

OBS.: O projeto precisa estar rodando para que as mudanças sejam vistas.git 