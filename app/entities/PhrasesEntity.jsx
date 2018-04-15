import _ from "lodash";

export default class PhrasesEntity {

  constructor() {
    this.result = {
      total: 0,
      _embedded: {},
    };
  }

  set(results) {
    console.log(results);
    if (_.size(results) === 0) {
      return false;
    }

    this.results = {
      total: _.size(results),
      _embedded: results,
    };

    return this.results;
  }

  get() {
    return this.results;
  }

}