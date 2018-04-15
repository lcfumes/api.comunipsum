import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PhrasesSchema = new Schema({
  phrase: String
});
const model = mongoose.model('phrases', PhrasesSchema);

export default class PhrasesModel {

  async getPhrase (limit, callback) {
    try {
      const results = await model.find().limit(limit);
      callback(results);
    } catch (err) {
      throw err;
    }
  }

  async getRandPhrase (limit, callback) {
    try {
      const results = await model.aggregate().sample(limit);
      callback(results);
    } catch (err) {
      throw err;
    }
  }

  async createPhrase (payload, callback) {
    model.findOne({phrase: payload.phrase}, (err, phrase) => {
      if (err) {
        return callback(err)
      }
      if (phrase !== null) {
        return callback(err, phrase, false)
      }

      let create = new model({
        phrase: payload.phrase
      });

      create.save((err, data) => {
        if (err) {
          return callback(err);
        }
        return callback(err, [data], true);
      });
    });
  }

  async deletePhrase (payload, callback) {
    model.findOne({phrase: payload.phrase}, (err, phrase) => {
      if (err) {
        return callback(err)
      }
      if (phrase === null) {
        return callback(err, false)
      }
      model.remove({phrase: payload.phrase}, (err) => {
        return callback(err, true)
      });
    });
  }

}