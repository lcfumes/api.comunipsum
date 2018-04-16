import PhrasesEntity from '../../app/entities/PhrasesEntity';

describe('Test Phrases Entity', () => {
  let phrase;

  beforeAll(() => {
    phrase =  {
      "_id": "5ad28d602ee1dc073a187cef",
      "phrase": "test phrase"
    };
  });

  it('should set a phrase and return 1 result', () => {
    const objPhrasesEntity = new PhrasesEntity();
    const phrases = [
      phrase
    ];
    objPhrasesEntity.set(phrases);

    expect(objPhrasesEntity.get()).toEqual({
      total: 1,
      _embedded: phrases
    });
  });

  it ('should set 2 phrases and return 2 results', () => {
    const objPhrasesEntity = new PhrasesEntity();
    const phrases = [];
    phrases.push(phrase);
    phrases.push(phrase);
    objPhrasesEntity.set(phrases);

    expect(objPhrasesEntity.get()).toEqual({
      total: 2,
      _embedded: phrases
    });
  });
});