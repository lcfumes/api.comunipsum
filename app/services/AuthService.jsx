import jwt from 'jsonwebtoken';
import Boom from 'boom';

export default class AuthService {

  static getToken(user) {
    let token = jwt.sign({
       exp: Math.floor(Date.now() / 1000) + (60 * 60),
       id: user._id,
       name: user.name,
       lastname: user.lastname,
       email: user.email
     }, 
     process.env.APP_COMUNIPSUM_SECRET_KEY
    );
    return token;
  }

  static verify(request, h) {
    return {
      authenticate: function (request, h) {
        const token = request.headers['x-access-token'];
        var decoded = jwt.verify(token, process.env.APP_COMUNIPSUM_SECRET_KEY);

        if (!token) {
          throw Boom.unauthorized(null);
        }
        if (decoded.type !== 'ADMIN') {
          throw Boom.unauthorized(null);
        }
        return h.authenticated({ credentials: { token: token } });
      }
    };
  }

}