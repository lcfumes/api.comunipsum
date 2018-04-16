import PhrasesEntity from '../app/entities/PhrasesEntity.jsx';

describe('Test Phrases Entity', () => {
  let phrase;

  beforeAll(() => {
    phrase =  {
        "_id": "5ad28d602ee1dc073a187cef",
        "phrase": "De cada um, de acordo com suas habilidades, a cada um, de acordo com suas necessidades."
    };
  });

  it('should set a phrase', () => {
    const objPhrasesEntity = new PhrasesEntity();
    objPhrasesEntity.set(phrase);

    console.log(objPhrasesEntity.get());

    //expect(objPhrasesEntity.get()).toEqual
    // return github.getUser('vnglst')
    // .then(data => {
    //   expect(data).toBeDefined()
    //   expect(data.entity.name).toEqual('Koen van Gilst')
    // })
  });
});