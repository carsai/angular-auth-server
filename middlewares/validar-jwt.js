const jwt = require('jsonwebtoken');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
const validarJwt = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Sesión no valida',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  return next();
};

module.exports = {
  validarJwt,
};
