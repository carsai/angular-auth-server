const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const nuevoUsuario = async (req, res) => {    
    const { email, name, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            });
        }        

        const dbUsuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();

        dbUsuario.password = bcrypt.hashSync(password, salt);

        await dbUsuario.save();

        const token = await generarJWT( dbUsuario.id, name );

       return res.status(201).json({
        ok: true,
        uid: dbUsuario.id,
        name,
        token
       });        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
};

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    
    try { 
        const dbUsuario = await Usuario.findOne({ email });

        if (!dbUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos introducidos no validos'
            });
        }

        const validPassword = bcrypt.compareSync( password, dbUsuario.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos introducidos no validos'
            });
        }

        const token = await generarJWT( dbUsuario.id, dbUsuario.name );

        return res.json({
            ok: true,
            uid: dbUsuario.id,
            name: dbUsuario.name,
            token
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const validarToken = async (req, res) => {
    const { uid, name } = req;
    
    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    nuevoUsuario,
    loginUsuario,
    validarToken
}