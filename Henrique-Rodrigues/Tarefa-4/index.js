const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let users = [
  { id: 1, name: 'Usuário 1', email: 'usuario1@example.com'},
  { id: 2, name: 'Usuário 2', email: 'usuario2@example.com'},
  { id: 3, name: 'Usuário 3', email: 'usuario3@example.com'}
]

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:id', (req, res) => {
   const id = Number(req.params.id)
   const user = users.find(u => u.id === id) 
   if (!user) {
     res.status(404).json({ message: 'Usuário não encontrado' })
   } else {
     res.json(user)
   }
})

app.post('/users', (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios' })
  }
  const newUser = {
    id: users.length + 1,
    name,
    email
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' }) 
  }
    {
    const { name, email } = req.body
    if (name) user.name = name
    if (email) user.email = email
    res.json(user)
  } 
})

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }
  const deletedUser =users.splice(userIndex, 1)
  res.json(deletedUser[0])
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
}) 