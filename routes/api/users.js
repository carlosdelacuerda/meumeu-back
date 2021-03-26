const { getAll, create, getByUsername, getById, deleteById, updateById, checkUsername, checkEmail } = require('../../models/users');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'public/images/profile' });
const fs = require('fs');


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
// router.post('/', async (req, res) => {
//     try {
//         req.body.password = bcrypt.hashSync(req.body.password, 10);
//         const result = await create(req.body);
//         res.json(result);
//     } catch (error) {
//         res.status(422).json({ error: error.message });
//     }
// });

// subida imágenes

const img = require('../../models/users');

router.get('/', async (req, res) => {
    const images = await img.find();
    res.json(images);
});

router.post('/', upload.single('picture'), async (req, res) => {
    const userCheck = await checkUsername(req.body.username);
    const emailCheck = await checkEmail(req.body.email);
    if (userCheck != null) {
        return res.json('errorName')
    } else if (emailCheck != null) {
        return res.json('errorEmail')
    } 
    if (req.file) {
    console.log(req.file);
    // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
    const extension = '.' + req.file.mimetype.split('/')[1];
    // Obtengo el nombre de la nueva imagen
    const newName = req.file.filename + extension;
    // Obtengo la ruta donde estará, adjuntándole la extensión
    const newPath = req.file.path + extension;
    // Muevo la imagen para que reciba la extensión
    fs.renameSync(req.file.path, newPath);

    // Modifico el BODY para poder incluir el nombre de la imagen en la BD
    req.body.picture = newName;
    } else {
        req.body.picture = "no-user.svg"
    }
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const newImage = await create(req.body);
        // envío mail
        console.log(newImage)
        res.json(newImage);
    } catch (err) {
        console.log(err)
        res.json(err);
    }

});


// login
router.post('/login', async (req, res) => {
    // Compruebo si el email está en la BD
    const user = await getByUsername(req.body.username);
    if (user) {
        // Compruebo si las password coinciden
        const match = bcrypt.compareSync(req.body.password , user.password);
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