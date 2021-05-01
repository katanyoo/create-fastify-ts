import fastify from 'fastify'
import fastifyBlipp from "fastify-blipp";
import { bootstrap } from 'fastify-decorators';

import { resolve } from 'path';

import configApp from './config/app'
import configSwagger from './config/swagger'

function build(opts: object = configApp) {
  const app = fastify(opts)
  app.register(fastifyBlipp)
  app.register(require('fastify-swagger'), configSwagger)

  app.register(bootstrap, {
    directory: resolve(__dirname, `controllers`),
    mask: /\.controller\./,
  });

  return app
}

export default build
