const { Router } = require('express');
const { check } = require('express-validator');

const { nuevoUsuario, loginUsuario, validarToken } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

// Crear usuario
router.post('/new', [
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('email', 'El email es obligatorio y debe ser valido').isEmail(),
  check('password', 'El password es obligatorio y debe ser de minimo 6 digitos').isLength({ min: 6 }),
  validarCampos,
], nuevoUsuario);

// login usuario
router.post('/', [
  check('email', 'El email es obligatorio y debe ser valido').isEmail(),
  check('password', 'El password es obligatorio y debe ser de minimo 6 digitos').isLength({ min: 6 }),
  validarCampos,
], loginUsuario);

// Validar y renovar token
router.get('/renew', validarJwt, validarToken);

module.exports = router;
