import _ from "lodash";

export default class UsersEntity {

  constructor() {
    this.result = {
      user: {

      },
      token: null
    };
  }

  setUser(user) {
    this.result.user = user;
  }

  setToken(token) {
    this.result.token = token;
  }

  get() {
    return this.result;
  }

}