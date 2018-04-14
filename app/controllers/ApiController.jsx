const Joi = require('joi');

export default class ApiController {

  handlerWorking(request, h) {
    return {'result': 'It`s working!'};
  }

  routes() {
    return [
      {
        method: 'GET',
        path: '/',
        handler: this.handlerWorking,
        config: {
          description: 'Its Working Route',
          notes: 'Its Working Route',
          tags: ['api', 'working', 'get'],
          validate: {},
        }
      }
    ];
  }
}