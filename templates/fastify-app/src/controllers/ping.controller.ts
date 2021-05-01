import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import pingSchema from './ping.schema';


@Controller({ route: '/ping' })
export default class PingController {

  private pingService = getInstanceByToken<PingService>(PingService);

  @GET({
    url: '/',
    options: {
      schema: pingSchema
    }
  })
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
    return { message: this.pingService?.ping() }
  }

}
