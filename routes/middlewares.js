const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
    // 1 - Comprobar si el token está en las cabeceras
    if (!req.headers['authorization']) {
        return res.json({ error: 'Debes incluir la cabecera Authorization' });
    }

    // 2 - Comprobar si el token es válido
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'mitoken');
    } catch (error) {
        return res.json({ error: 'El token es incorrecto' });
    }

    // 3 - Comprobar si el token está caducado
    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'El token está caducado' });
    }

    // Incluir en la petición el ID del USUARIO que está realizando dicha petición
    req.userId = data.userId;

    next();
}

module.exports = {
    checkToken
}