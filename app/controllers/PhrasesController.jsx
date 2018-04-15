import Joi from 'joi';
import PhrasesModel from '../models/PhrasesModel';
import PhrasesEntity from '../entities/PhrasesEntity';

export default class PhrasesController {

  getPhrases(request, h) {
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

  getRandPhrases(request, h) {
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

  async insertPhrase(request, h) {
    console.log(request);

    return {false: true};
  }

  routes() {
    return [
      {
        method: ['GET'],
        path: '/phrases/{limit?}',
        handler: this.getPhrases,
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
        handler: this.getRandPhrases,
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
        handler: this.insertPhrase,
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
      }
    ];
  }
}