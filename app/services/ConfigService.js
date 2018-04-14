import _ from "lodash";

export default class ConfigService {

  constructor() {
    this.nodeEnv = process.env.NODE_ENV || 'development';
  }

  getEnv() {
    return this.nodeEnv;
  }

}