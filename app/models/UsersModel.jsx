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
    try {
      const count = await model.count();
      return count;
    } catch (err) {
      throw err;
    }
  }

  async findUser(userData) {
    try {
      const user = await model.findOne(userData);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user, callback) {
    try {
      const findUser = await model.findOne({email: user.email});
      if (findUser !== null) {
        return {
          "exists": true,
          "result": findUser
        };
      }
    } catch (err) {
      throw err;
    }

    const userData = {
      name: user.name,
      lastname: user.latname,
      email: user.email,
      password: user.password,
      type: user.type
    }
    
    const create = new model(userData);

    try {
      const createUser = await create.save();

      return {
        "exists": false,
        "result": createUser
      };

    } catch (err) {
      throw err;
    }
  }

}