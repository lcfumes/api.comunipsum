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
      total: _.size(results),
      _embedded: results,
    };
  }

  get() {
    return this.results;
  }

}