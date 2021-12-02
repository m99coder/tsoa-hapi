import { app } from './app'

const host = process.env.HOST || 'localhost'
const port = Number(process.env.PORT) || 3000

void app(host, port).start()
console.log(`Server running on ${host}:${port}`)
