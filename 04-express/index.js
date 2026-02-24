import express from 'express';

const PORT = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hola desde express</h1>')
})

app.get('/users', (req, res) => {
  res.send('<h1>Users endpoint</h1>')
})

app.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT)
})

