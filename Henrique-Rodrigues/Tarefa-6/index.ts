import express from 'express'
import type { Request, Response, NextFunction } from 'express';

const app =  express();
const port = 3000;
const tokenAuthorization = 'TOKEN-CORRETO';

app.use(express.json());

function authToken (req:Request, res:Response, next:NextFunction){
  const authHeader = req.headers.authorization
  if (!authHeader){
    return res.status(401).json({ message: 'Token não foi fornecido!'})
  }
  if (authHeader !== tokenAuthorization)
    return res.status(403).json({ message: 'Token inválido!'})
  next()
};

interface User {
    id: number
    name: string
    email: string
};

let users: User[] = [
    { id: 1, name: 'Usuário 1', email: 'usuario1@example.com'},
    { id: 2, name: 'Usuário 2', email: 'usuario2@example.com'},
    { id: 3, name: 'Usuário 3', email: 'usuario3@example.com'}
];

app.get('/', (req, res)=>{
    res.send('Bem vindo ao CRUD de usuários!')
});

app.get('/users', (req, res) => {
  res.json(users)
});

app.get('/users/:id', (req, res) => {
   const id = Number(req.params.id)
   const user = users.find(u => u.id === id) 
   if (!user) {
     res.status(404).json({ error: 'Usuário não encontrado!' })
   } else {
     res.json(user)
   }
});

app.post('/users', authToken, (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios!' })
  }
  const newUser = {
    id: users.length + 1,
    name,
    email
  }
  users.push(newUser)
  res.status(201).json({ 
    message: 'Usuário criado com sucesso!',
    newUser
  })
});

app.patch('/users/:id', authToken, (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado!' }) 
  }
  {
  const { name, email } = req.body
  if (!name && !email) {
    return res.status(400).json({ error: 'Envie ao menos um campo para atualizar!'})
  }
  if (name) user.name = name
  if (email) user.email = email
  res.status(200).json({ 
    message: 'Dados atualizados com sucesso!',
    user
  })
  } 
});

app.put('/users/:id', authToken, (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user){
    return res.status(404).json({ error: 'Usuário não encontrado!'})
  }
  const { name, email } = req.body
  if (!name || !email)
    return res.status(400).json({ error: 'Nome e email são obrigatórios!' })
  user.name = name
  user.email = email
  res.status(200).json({ 
    message: 'Dados atualizados com sucesso!',
    user
  })
});

app.delete('/users/:id', authToken, (req, res) => {
  const id = Number(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado!' })
  }
  const deletedUser =users.splice(userIndex, 1)
  res.status(200).json({ message: 'Usuário deletado com sucesso!'})
});

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})