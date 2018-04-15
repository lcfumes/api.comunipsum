import Joi from 'joi';
import PhrasesModel from '../models/PhrasesModel';
import PhrasesEntity from '../entities/PhrasesEntity';

export default class PhrasesController {

  async getPhrases(request, h) {
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

  async getRandPhrases(request, h) {
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

  routes() {
    return [
      {
        method: ['GET'],
        path: '/phrases/{limit?}',
        handler: this.getPhrases,
        config: {
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
          description: 'Returns randomical the number of requested phrases',
          notes: 'default is limit=1',
          tags: ['api', 'phrases', 'get'],
          validate: {
            params: {
              limit: Joi.number().allow('').optional()
            }
          }
        }
      }
    ];
  }
}