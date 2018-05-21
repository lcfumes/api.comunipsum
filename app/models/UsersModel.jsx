import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_DYNAMO_ENDPOINT
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const table = 'users';

export default class UsersModel {

  async totalDocs(callback) {
    const params = {
        TableName: table,
        Select:'COUNT'
    };
     
    try {
      return await dynamodb.query(params).promise();
    } catch (err) {
      throw err;
    }
  }

  async findUser(userData) {
    const params = {
      TableName: table,
      Key: userData
    };
    try {
      const user = await dynamodb.get(params).promise();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user) {
    let params = {
      TableName: table,
      Key: {
        email: user.email
      }
    };
    try {
      const findUser = await dynamodb.get(params).promise();
      if (findUser !== null) {
        return {
          "exists": true,
          "result": findUser
        };
      }
    } catch (err) {
      throw err;
    }

    params = {
      TableName: table,
      Item: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        type: user.type
      }
    };

    try {
      const create = await dynamodb.put(params).promise();

      return {
        "exists": false,
        "result": create
      };

    } catch (err) {
      throw err;
    }
  }

}