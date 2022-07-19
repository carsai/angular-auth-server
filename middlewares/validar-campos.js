const { validationResult } = require('express-validator');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);    

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    return next();
}

module.exports = validarCampos;
