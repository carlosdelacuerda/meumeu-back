const { getAll, create, deleteById, updateById, getByCountry, getById } = require('../../models/desires');
const router = require('express').Router();

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
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
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
router.get('/detaildesire/:id', async (req, res) => {
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