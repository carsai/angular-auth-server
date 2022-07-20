const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
  const payLoad = { uid };

  return new Promise((resolve, reject) => {
    jwt.sign(payLoad, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h',
    }, (err, token) => {
      if (err) {
        console.log('Error token', err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarJWT,
};
