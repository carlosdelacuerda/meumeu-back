const { getAll, create, getByUsername, getById, deleteById, updateById } = require('../../models/users');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Recupera todos los clientes y devuelve JSON
router.get('/', async (req, res) => {

    // Id de usuario inyectado por el Middleware checkToken!
    console.log(req.userId);

    try {
        const users = await getAll();
        res.json(users);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// router.get('/:user', async (req, res) => {
//     try {
//         const userByUserName = await getByUsername(req.params.user);
//         res.json(userByUserName);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const userById = await getById(req.params.id);
        res.json(userById);
    } catch (error) {
        res.json({ error: error.message });
    }
});


// crear user
router.post('/', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// login
router.post('/login', async (req, res) => {
    // Compruebo si el email está en la BD
    const user = await getByUsername(req.body.username);
    if (user) {
        // Compruebo si las password coinciden
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (match) {
            res.json({
                success: 'Login correcto',
                token: createToken(user)
            });
        } else {
            res.json({ error: 'Error en password' });
        }
    } else {
        res.json({ error: 'Error en username' });
    }
});

function createToken(pUser) {
    const data = {
        id: pUser.id,
    }

    return jwt.sign(data, 'm1T*k3n');
}













// Borro un cliente
router.delete('/:idUser', async (req, res) => {
    try {
        const result = await deleteById(req.params.idUser);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Actualizo un cliente
router.put('/', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;