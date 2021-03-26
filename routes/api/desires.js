const { getAll, create, deleteById, updateById, getByCountry, getById } = require('../../models/desires');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images/desire' });
const fs = require('fs');

// Recupera todos los deseos y devuelve JSON
router.get('/', async (req, res) => {


    try {
        const desires = await getAll();
        res.json(desires);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Crear un nuevo deseo
// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const result = await create(req.body);
//         res.json(result);
//     } catch (error) {
//         res.status(422).json({ error: error.message });
//     }
// });

// subida imágenes

const img = require('../../models/desires');

router.get('/', async (req, res) => {
    const images = await img.find();
    res.json(images);
});

router.post('/', upload.single('image'), async (req, res) => {
    // const userCheck = await checkUsername(req.body.username);
    // if (userCheck != null) {
    //     return res.json('usuario existente')
    // } 
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
    req.body.image = newName;

    try {
        const newImage = await create(req.body);
        res.json(newImage);
    } catch (err) {
        console.log(err)
        res.json(err);
    }

});

router.get('/:country', async (req, res) => {

    try {
        const desirestByCountry = await getByCountry(req.params.country);
        res.json(desirestByCountry);
    } catch (error) {
        res.json({ error: error.message });
    }
});


//detalle deseo
router.get('/detail/:id', async (req, res) => {
    try {
        const byId = await getById (req.params.id);
        res.json(byId);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Borro un deseo
router.delete('/:idDesire', async (req, res) => {
    try {
        const result = await deleteById(req.params.idDesire);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Actualizo un deseo
router.put('/', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;