import jwt from 'jsonwebtoken';
import Boom from 'boom';

const AuthService = (server, options) => {
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
};

export default AuthService;