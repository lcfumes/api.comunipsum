import Joi from 'joi';
import Boom from 'boom';
import PhrasesModel from '../models/PhrasesModel';
import PhrasesEntity from '../entities/PhrasesEntity';

export default class PhrasesController {

  async handleGetPhrases(request, h) {
    const limit = request.params.limit || 1;
    const objPhrasesModel = new PhrasesModel();
    
    try {
      const phrases = await objPhrasesModel.getPhrase(limit);
      const entity = new PhrasesEntity();
      entity.set(phrases);
      return entity.get();
    } catch(err) {
      throw Boom.serverUnavailable(err);
    }
  }

  async handleGetRandPhrases(request, h) {
    const limit = request.params.limit || 1;
    const objPhrasesModel = new PhrasesModel();
    try {
      const phrases = await objPhrasesModel.getRandPhrase(limit);
      const entity = new PhrasesEntity();
      entity.set(phrases);
      return entity.get();
    } catch(err) {
      throw Boom.serverUnavailable(err);
    }
  }

  async handleCreatePhrase(request, h) {
    const objPhrasesModel = new PhrasesModel();
    try {
      const phrase = await objPhrasesModel.createPhrase(request.payload);
      const entity = new PhrasesEntity();
      entity.set(phrase.result);
      if (phrase.exists) {
        return Boom.conflict('Already exists.');
      }
      return entity.get();
    } catch(err) {
      throw Boom.serverUnavailable(err);
    }
  }

  async handleDeletePhrase(request, h) {
    const objPhrasesModel = new PhrasesModel();
    try {
      const remove = await objPhrasesModel.deletePhrase(request.payload);
      if (!remove) {
        const response = h.response({});
        response.code(204);
        return response; 
      }
      return {};
    } catch(err) {
      throw Boom.serverUnavailable(err);
    }
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