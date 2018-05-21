import _ from "lodash";

export default class PhrasesEntity {

  constructor() {
    this.result = {
      total: 0,
      _embedded: {},
    };
  }

  set(results) {
    this.results = {
      total: results.Count,
      _embedded: results.Items,
    };
  }

  get() {
    return this.results;
  }

}