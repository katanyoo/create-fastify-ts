import { Service, Initializer, Destructor } from 'fastify-decorators';

@Service()
export default class PingService {
  @Initializer()
  async init(): Promise<void> {
  }

  ping(): string {
    return 'pong'
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
