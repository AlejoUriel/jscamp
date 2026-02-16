import { createServer } from 'node:http'
import { uptime } from 'node:process'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

const users = [
  {
    "id": 1,
    "name": "Alejo"
  },
  {
    "id": 2,
    "name": "Maria"
  },
  {
    "id": 3,
    "name": "Juan"
  },
  {
    "name": "midudev",
    "id": "5e3f90db-69a1-44ca-a733-746858fa9187"
  },
  {
    "name": "pheralb",
    "id": "4645d1d3-ece1-4b27-bb0f-23a03469d631"
  }
]

process.loadEnvFile()

const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json', 'charset=utf-8')
  res.end(JSON.stringify(data))
}

const server = createServer( async (req, res) => {
  const { method, url } = req

  const [pathname, queryString] = url.split('?')
  const searchParams = new URLSearchParams(queryString)
  console.log(searchParams.get('limit'))
  
  if (method === 'GET') {
    if (pathname === '/') {
      res.setHeader('Content-Type', 'text/plain', 'charset=utf-8') 
      return res.end('Hola desde node')
    }

    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)

      return sendJson(res, 200, paginatedUsers)
    }

    if (pathname === '/health') {
    return sendJson(res, 200, { status: 'ok', uptime: Math.floor(uptime()) + 's' })
    }

  }
  
  if (method == 'POST') {
    if (pathname === '/users') {
      const body = await json(req)
      
      if (!body || !body.name) {
        return sendJson(res, 400, { message: 'Name is required' })
      }

      const newUser = {
        name: body.name,
        id: randomUUID(),
      }

      users.push(newUser)

      return sendJson(res, 201, { message: 'User created' })
    }
  }

  return sendJson(res, 404, { message: 'Not found' })
})

server.listen(port, () => {
  const adress = server.address()
  console.log(`Server is running on port ${adress.port}`);
})