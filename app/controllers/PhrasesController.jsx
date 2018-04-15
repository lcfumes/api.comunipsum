import Joi from 'joi';
import Boom from 'boom';
import PhrasesModel from '../models/PhrasesModel';
import PhrasesEntity from '../entities/PhrasesEntity';

export default class PhrasesController {

  handleGetPhrases(request, h) {
    const limit = request.params.limit || 1;
    const objPhrasesModel = new PhrasesModel();
    const promise = new Promise((resolve, reject) => {
      objPhrasesModel.getPhrase(limit, (result) => {
        const entity = new PhrasesEntity();
        entity.set(result);
        resolve(entity.get());
      });
    });

    return promise;
  }

  handleGetRandPhrases(request, h) {
    const limit = request.params.limit || 1;
    const objPhrasesModel = new PhrasesModel();
    const promise = new Promise((resolve, reject) => {
      objPhrasesModel.getRandPhrase(limit, (result) => {
        const entity = new PhrasesEntity();
        entity.set(result);
        resolve(entity.get());
      });
    });

    return promise;
  }

  handleCreatePhrase(request, h) {
    const objPhrasesModel = new PhrasesModel();
    const promise = new Promise((resolve, reject) => {
      objPhrasesModel.createPhrase(request.payload, (err, result, created) => {
        if (err) {
          throw Boom.serverUnavailable('unavailable');
        }
        const entity = new PhrasesEntity();
        entity.set(result);
        if (!created) {
          resolve(Boom.conflict('Already exists.'));
        }
        resolve(entity.get());
      });
    });
    return promise;
  }

  handleDeletePhrase(request, h) {
    const objPhrasesModel = new PhrasesModel();
    const promise = new Promise((resolve, reject) => {
      objPhrasesModel.deletePhrase(request.payload, (err, deleted) => {
        if (err) {
          throw Boom.serverUnavailable('unavailable');
        }
        if (!deleted) {
          const response = h.response({});
          response.code(204);
          resolve(response);
        }
        resolve({});
      });
    });
    return promise;
  }

  routes() {
    return [
      {
        method: ['GET'],
        path: '/phrases/{limit?}',
        handler: this.handleGetPhrases,
        config: {
          auth: false,
          description: 'Returns the number of requested phrases',
          notes: 'default is limit=1',
          tags: ['api', 'phrases', 'get'],
          validate: {
            params: {
              limit: Joi.number().allow('').optional()
            }
          }
        }
      },
      {
        method: ['GET'],
        path: '/phrases/rand/{limit?}',
        handler: this.handleGetRandPhrases,
        config: {
          auth: false,
          description: 'Returns randomical the number of requested phrases',
          notes: 'default is limit=1',
          tags: ['api', 'phrases', 'get'],
          validate: {
            params: {
              limit: Joi.number().allow('').optional()
            }
          }
        }
      },
      {
        method: ['POST'],
        path: '/phrases/',
        handler: this.handleCreatePhrase,
        config: {
          auth: "token",
          description: 'Insert a new phrase',
          notes: 'must be logged',
          tags: ['api', 'phrases', 'post'],
          validate: {
            payload: {
              phrase: Joi.string().required().description('New phrase'),
            },
            headers: Joi.object().keys({
              'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
              'x-access-token': Joi.string().required().description('Auth Token')
            }).unknown()
          }
        }
      },
      {
        method: ['DELETE'],
        path: '/phrases/',
        handler: this.handleDeletePhrase,
        config: {
          auth: "token",
          description: 'Delete a expecific phrase',
          notes: 'must be logged',
          tags: ['api', 'phrases', 'delete'],
          validate: {
            payload: {
              phrase: Joi.string().required().description('Phrase to delete'),
            },
            headers: Joi.object().keys({
              'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
              'x-access-token': Joi.string().required().description('Auth Token')
            }).unknown()
          }
        }
      }
    ];
  }
}