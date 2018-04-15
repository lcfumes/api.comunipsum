import Joi from 'joi';
import Boom from 'boom';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import UsersEntity from '../entities/UsersEntity';
import crypto from 'crypto';
import AuthService from '../services/AuthService';

export default class UsersController {

  async handleCreateUser(request, h) {
    let user = request.payload;
    user.password = crypto.createHash('md5').update(request.payload.password).digest("hex");
    const objUsersModel = new UsersModel();
    try {
      const userCreate = await objUsersModel.createUser(user);
      if (userCreate.exists) {
        return Boom.conflict('Already exists.');
      }

      const objUsersEntity = new UsersEntity();
      objUsersEntity.setUser(userCreate.result);
      objUsersEntity.setToken(AuthService.getToken(userCreate.result));

      return objUsersEntity.get();
    } catch (err) {
      throw Boom.serverUnavailable(err);
    }
  }

  async handleLoginUser(request, h) {
    let login = request.payload;
    login.password = crypto.createHash('md5').update(login.password).digest("hex");

    const objUserModel = new UsersModel();
    try {
      const user = await objUserModel.findUser(login);
      if (user === null) {
        return Boom.unauthorized();
      }
      const objUsersEntity = new UsersEntity();
      objUsersEntity.setUser(user);
      objUsersEntity.setToken(AuthService.getToken(user));

      return objUsersEntity.get();
    } catch (err) {
      throw Boom.serverUnavailable(err);
    }
  }

  routes() {
    return [
      {
        method: 'POST',
        path: '/users/create',
        handler: this.handleCreateUser,
        config: {
          auth: 'token',
          description: 'Create a new user',
          notes: 'Will create and return a valid token',
          tags: ['api', 'create', 'post'],
          validate: {
            headers: Joi.object().keys({
              'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
              'x-access-token': Joi.string().required().description('Auth Token')
            }).unknown(),
            payload: {
              name: Joi.string().min(3).required().description('User Name'),
              lastname: Joi.string().min(1).required().description('User Last Name'),
              email: Joi.string().email().required().description('User Email'),
              password: Joi.string().min(5).required().description('User Password'),
              type: Joi.string().min(5).required().description('User type')
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/users/login',
        handler: this.handleLoginUser,
        config: {
          auth: false,
          description: 'User login',
          notes: 'Returns a valid token',
          tags: ['api', 'login', 'post'],
          validate: {
            headers: Joi.object().keys({
              'content-type': Joi.string().required().valid(['application/json']).default('application/json')
            }).unknown(),
            payload: {
              email: Joi.string().email().required().description('User Email'),
              password: Joi.string().min(5).required().description('User Password')
            }
          }
        }
      }
    ];
  }
}