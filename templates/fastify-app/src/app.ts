import fastify from 'fastify'
import fastifyBlipp from "fastify-blipp";
import { bootstrap } from 'fastify-decorators';

import { resolve } from 'path';

import configApp from './config/app'
import configSwagger from './config/swagger'

const app = fastify(configApp)
app.register(fastifyBlipp)
app.register(require('fastify-swagger'), configSwagger)

app.register(bootstrap, {
  directory: resolve(__dirname, `controllers`),
  mask: /\.controller\./,
});


if (require.main === module) {
  const start = async () => {
    try {
      await app.listen(3000)
      app.blipp()
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  start()
} else {
  // required as a module => executed on aws lambda
  module.exports = app
}
