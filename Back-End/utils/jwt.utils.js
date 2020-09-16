const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.SESSION_SECRET;

module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },
  generateTokenForAdministrator: (adminData) => {
    return jwt.sign(
      {
        adminId: adminData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },
  parseAuthorization: (authorization) => {
    return authorization !== null ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: (authorization, response) => {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if (token) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (!jwtToken) {
          return response.status(401).json({
            error: 'Token nul lors de la vérification ! ❌',
          });
        }
        userId = jwtToken.userId;
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          return response.status(401).json({
            error: 'Token invalide lors de la vérification ! ❌',
          });
        }
      }
    }
    return userId;
  },
  getAdministratorId: (authorization, response) => {
    let adminId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if (token) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (!jwtToken) {
          return response.status(401).json({
            error: 'Token nul lors de la vérification ! ❌',
          });
        }
        adminId = jwtToken.adminId;
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          return response.status(401).json({
            error: 'Token invalide lors de la vérification ! ❌',
          });
        }
      }
    }
    return adminId;
  },
};
