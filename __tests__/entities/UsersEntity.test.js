import UsersEntity from '../../app/entities/UsersEntity';

describe('Test Users Entity', () => {
  let user;
  let token;

  beforeAll(() => {
   user = {
      "_id": "5ad3f138d5a7a40282454f07",
      "name": "Luiz",
      "lastname": "Fumes",
      "email": "loremipsum@loremipsum.com",
      "password": "loremipsum",
      "type": "ADMIN",
      "__v": 0
    };
    token = "loremipsumloremipsum";
  });

  it('should set and return a user', () => {
    const objUsersEntity = new UsersEntity();
    objUsersEntity.setUser([user]);
    expect(objUsersEntity.get()).toEqual({
      user:[
        user
      ],
      token: null
    });    
  });

  it('should set and return a user and token', () => {
    const objUsersEntity = new UsersEntity();
    objUsersEntity.setUser([user]);
    objUsersEntity.setToken(token);
    expect(objUsersEntity.get()).toEqual({
      user:[
        user
      ],
      token
    });    
  });
});