import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
import { Item } from '../models';

export default fp(async server => {
  try {
    const connection = await createConnection();
    console.log('database connected');

    server.decorate('db', {
      products: connection.getRepository(Item)
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
