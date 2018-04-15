import _ from 'lodash';

import ApiController from '../controllers/ApiController';
import PhrasesController from '../controllers/PhrasesController';
import UsersController from '../controllers/UsersController';

const importControllers = [
  ApiController,
  PhrasesController,
  UsersController
];

const routes = [];

_.map(importControllers, (controller) => {
  const objController = new controller();
  _.map(objController.routes(), (route) => {
    routes.push(route);
  });
})

module.exports = routes;