import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  type: String
});

const model = mongoose.model('users', UsersSchema);

export default class UsersModel {

  async totalDocs(callback) {
    model.count({}, (err, count) => {
      callback(err, count)
    });
  }

  async findUser(userData, callback) {
    const user = await model.findOne(userData, (err, user) => {
      callback(err, user);
    });
  }

  async createUser(user, callback) {
    model.findOne({email: user.email}, (err, response) => {
      if (err) {
        return callback(err);
      }
      if (response !== null) {
        return callback(err, {}, false);
      }

      const userData = {
        name: user.name,
        lastname: user.latname,
        email: user.email,
        password: user.password,
        type: user.type
      }

      let create = new model(userData);

      create.save((err, data) => {
        if (!err) {
          return callback(err, data, true)
        }
      });
    })
  }

}