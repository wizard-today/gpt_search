import * as http from 'http'
import { URL } from 'url'

import { InputError, NotFoundError } from './errors'
import { Actions, GetRequestInput } from './types'

const handler = (actions: Actions) => async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url!, `http://${req.headers.host}`)
      const action = url.pathname.slice(1)
      const input: GetRequestInput = {}
      url.searchParams.forEach((value, key) => {
        input[key] = value
      })

      const runAction = actions[action]

      if (!runAction) {
        throw new NotFoundError(action)
      }

      const result = await runAction(input)

      const output = (
        typeof result === 'string'
          ? result
          : JSON.stringify(result)
      )

      res.setHeader('Content-Type', typeof result === 'string' ? 'text/plain' : 'application/json')
      res.writeHead(200)
      res.end(output)
    }
  } catch (error) {
    if (InputError.is(error)) {
      res.writeHead(400)
      res.end()
    } else if (NotFoundError.is(error)) {
      res.writeHead(404)
      res.end()
    } else {
      console.error(error)
      res.writeHead(500)
      res.end()
    }
  }

  if (!res.writableEnded) {
    res.writeHead(404)
    res.end()
  }
}

export const startServer = (actions: Actions): http.Server => {
  const server = http.createServer(handler(actions))
  server.listen(8080)
  return server
}
