import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_DYNAMO_ENDPOINT
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const table = 'phrases';

export default class PhrasesModel {

  async getPhrase(limit) {
    const params = {
      TableName: table,
      Limit: limit
    };
    try {
      return dynamodb.scan(params).promise();
    } catch (err) {
      throw err;
    }
  }

  async getRandPhrase(limit) {
    const params = {
      TableName: table
    };
    try {
      const all = await dynamodb.scan(params).promise();
      const result = {
        Items: [],
        Count: 0
      }
      for (let i=0; i < limit; i++) {
        const random = Math.floor(Math.random() * all.Count);
        result.Items.push(all.Items[random]);
        result.Count++;
      }
      return result;

    } catch (err) {
      throw err;
    }
  }

  async createPhrase(payload) {
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

    const params = {
      TableName: table,
      Item:{
        "phrase": payload.phrase,
      }
    };

    try {
      const create = await dynamodb.put(params).promise();

      return {
        "exists": false,
        "result": create
      }
    } catch(err) {
      throw err;
    }
  }

  async deletePhrase(payload, callback) {
    const params = {
      TableName: table,
      Key:{
        "phrase": payload.phrase,
      },
      ConditionExpression:"info.rating <= :val",
      ExpressionAttributeValues: {
        ":val": 5.0
      }
    };

    try {
      const phrase = await model.findOne({phrase: payload.phrase});
      if (phrase === null) {
        return false;
      }
    } catch (err) {
      return err;
    }

    try {
      const remove = await dynamodb.delete(params).promise();
      return true;
    } catch (err) {
      throw err;
    }
  }

}