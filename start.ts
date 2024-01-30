import { startServer } from './server/start_server'

import { browse } from './actions/browse'
import { search_on_google } from './actions/search_on_google'

const server = startServer({
  browse,
  search_on_google,
})

server.addListener('listening', () => {
  console.log('Server started!')
})
