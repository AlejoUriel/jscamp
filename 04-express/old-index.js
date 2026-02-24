import express from 'express';
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hola desde express</h1>')
})

app.get('/users', (req, res) => {
  res.send('<h1>Users endpoint</h1>')
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok',
    uptime: process.uptime(),
  })
})