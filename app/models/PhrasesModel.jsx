import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PhrasesSchema = new Schema({
  phrase: String
});
const model = mongoose.model('phrases', PhrasesSchema);

export default class PhrasesModel {

  async getPhrase(limit, callback) {
    try {
      const results = await model.find().limit(limit);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async getRandPhrase(limit, callback) {
    try {
      const results = await model.aggregate().sample(limit);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async createPhrase(payload, callback) {
    try {
      const phrase = await model.findOne({phrase: payload.phrase});
      if (phrase !== null) {
        return {
          "exists": true,
          "result": phrase
        }
      }
    } catch(err) {
      throw err;
    }

    const createPhrase = new model({
      phrase: payload.phrase
    });

    try {
      const create = await createPhrase.save();
      return {
        "exists": false,
        "result": create
      }
    } catch(err) {
      throw err;
    }
  }

  async deletePhrase(payload, callback) {
    try {
      const phrase = await model.findOne({phrase: payload.phrase});
      if (phrase === null) {
        return false;
      }
    } catch (err) {
      return err;
    }

    try {
      const remove = await model.remove({phrase: payload.phrase});
      return true;
    } catch (err) {
      throw err;
    }
  }

}