import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PhrasesSchema = new Schema({
  phrase: String
});
const phrases = mongoose.model('phrases', PhrasesSchema);

export default class PhrasesModel {

  async getPhrase (limit, callback) {
    try {
      const results = await phrases.find().limit(limit);
      callback(results);
    } catch (err) {
      throw err;
    }
  }

  async getRandPhrase (limit, callback) {
    try {
      const results = await phrases.aggregate().sample(limit);
      callback(results);
    } catch (err) {
      throw err;
    }
  }

}