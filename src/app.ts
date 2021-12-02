import * as Hapi from '@hapi/hapi'
import { RegisterRoutes } from './routes'

export const app = (host = 'localhost', port = 3000): Hapi.Server => {
  const server = Hapi.server({ host, port })
  RegisterRoutes(server)
  return server
}
