const { getAllTrips, create, deleteByTripId, updateByTripId, getByCountry, getById } = require('../../models/trips');
const router = require('express').Router();

// Recupera todos los viajes y devuelve JSON
router.get('/', async (req, res) => {

    try {
        const trips = await getAllTrips();
        res.json(trips);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// viajes por pais
// api/trips/country
router.get('/:country', async (req, res) => {

    try {
        const tripsByCountry = await getByCountry(req.params.country);
        res.json(tripsByCountry);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//detalle trip
router.get('/detail/:id', async (req, res) => {
    try {
        const byId = await getById (req.params.id);
        res.json(byId);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Crear un nuevo viaje
router.post('/', async (req, res) => {
    console.log(req.userId);
    try {
        console.log(req.body)
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Borro un viaje
router.delete('/:idTrip', async (req, res) => {
    try {
        const result = await deleteByTripId(req.params.idTrip);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Actualizar
router.put('/', async (req, res) => {
    try {
        const result = await updateByTripId(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;