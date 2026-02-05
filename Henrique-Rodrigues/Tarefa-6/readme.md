Para testar os comandos seguir o passo a passo:

Listar usuários (GET)
Todos: http://localhost:3000/users 
Por id: http://localhost:3000/users/1

Criar um novo usuário (POST)
Abrir um novo terminal git bash e executar o comando:
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: TOKEN-CORRETO" \
  -d '{"name":"Usuário4","email":"usuario4@email.com"}'

Atualizar parcialmente as informações de um usuário (PATCH)
Abrir um novo terminal git bash e executar o comando:
curl -X PATCH http://localhost:3000/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: TOKEN-CORRETO" \
  -d '{"name":"Nome Atualizado"}'

Atualizar todas as informações de um usuário (PUT)
Abrir um novo terminal git bash e executar o comando:
curl -X PUT http://localhost:3000/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: TOKEN-CORRETO" \
  -d '{"name":"Nome Atualizado","email":"emailatualizado@email.com"}'

Apagar um usuário (DELETE)
curl -X DELETE http://localhost:3000/users/2 \
  -H "Authorization: TOKEN-CORRETO"

OBS.: O projeto precisa estar rodando para que as mudanças sejam vistas