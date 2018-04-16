import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import mongoose from 'mongoose';
import HapiAuthJwt2 from 'hapi-auth-jwt2';
import Pack from '../package.json';
import Routes from './routes/routes';
import AuthService from './services/AuthService';

const server = new Hapi.Server({
  port: process.env.APP_COMUNIPSUM_PORT,
});

server.auth.scheme('custom', AuthService.verify);
server.auth.strategy('token', 'custom');
server.app.secretAppToken = process.env.APP_COMUNIPSUM_SECRET_KEY;

(async () => {
  const swaggerOptions = {
    info: {
      title: 'Comunipsum API Documentation',
      version: Pack.version,
    },
  };

  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
      HapiAuthJwt2,
    ]);
  } catch (err) {
    throw err;
  }

  try {
    server.auth.strategy(
      'jwt', 'jwt',
      {
        key: process.env.APP_COMUNIPSUM_SECRET_KEY,
        validate: true,
        verifyOptions: { algorithms: ['HS256'] },
      },
    );
  } catch (err) {
    throw err;
  }

  server.auth.default('jwt');

  try {
    await server.route(Routes);
  } catch (err) {
    throw err;
  }

  try {
    await server.start();
    mongoose.connect(`mongodb://${process.env.DB_COMUNIPSUM_HOST}/${process.env.DB_COMUNIPSUM_DATABASE}`);

    // eslint-disable-next-line no-console
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    throw err;
  }
})();
