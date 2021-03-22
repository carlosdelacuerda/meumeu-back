const router = require('express').Router();
const { getAll, create, getById, updateById, deleteById } = require('../models/users');

// /users
router.get('/', async (req, res) => {
    // getAll()
    //     .then((rows) => {
    //         res.json(rows);
    //     })
    //     .catch((err) => console.log(err));

    try {
        const rows = await getAll();
        res.render('users/lista', {
            arrUsers: rows
        });
    } catch (err) {
        console.log(err);
    }
});

// /users/new
router.get('/new', (req, res) => {
    // Renderizar una vista (formulario.pug) que reprensente cada uno de los campos necesarios para crear un user
    res.render('users/formulario');
});

// /users/create
router.post('/create', async (req, res) => {
    console.log(req.body);
    const result = await create(req.body);
    console.log(result);
    res.redirect('/users');
});

// /users/edit/7
router.get('/edit/:iduser', async (req, res) => {
    const user = await getById(req.params.iduser);
    res.render('users/formularioEdit', { user });
});

// /users/update
router.post('/update', async (req, res) => {
    const result = await updateById(req.body);
    res.redirect('/users');
});

router.get('/delete/:iduser', async (req, res) => {
    await deleteById(req.params.iduser);
    res.redirect('/users');
});

module.exports = router;    