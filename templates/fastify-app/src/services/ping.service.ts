import { Service, Initializer, Destructor } from 'fastify-decorators';

@Service()
export class PingService {
  @Initializer()
  async init(): Promise<void> {
  }

  async ping(count: number = 0): Promise<object> {
    return { message: 'pong' }
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
