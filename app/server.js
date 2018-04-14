import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import mongoose from 'mongoose';
import Pack from '../package';
import ConfigService from './services/ConfigService';
import Routes from './routes/routes';

const server = new Hapi.Server({
  port: process.env.APP_COMUNIPSUM_PORT
});

mongoose.connect(`mongodb://${process.env.DB_COMUNIPSUM_HOST}/${process.env.DB_COMUNIPSUM_DATABASE}`);

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
        options: swaggerOptions
      }
    ]);
  } catch (err) {
    console.log(err);
  }
  
  try {
    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch(err) {
    console.log(err);
  }
  
  try {
    await server.route(Routes);
  } catch(err) {
    console.log(err);
  }
})();