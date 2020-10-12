import * as http from 'http'
import config from '@config'
import app from './app'

const server = http.createServer(app)
server.listen(config.SERVER_PORT)

