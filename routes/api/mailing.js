const { getAll, create, deleteByTripId, updateByTripId, getByCountry, getRecibed, getSend, getById, arrByMail } = require('../../models/mailing');
const router = require('express').Router();

// Recupera todos los viajes y devuelve JSON
router.get('/', async (req, res) => {

    try {
        const mails = await getAll();
        res.json(mails);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// msn recibidos

router.get('/inbox/:recibed', async (req, res) => {
    try {
        const messagesRecibed= await getRecibed(req.params.recibed);
        res.json(messagesRecibed);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// msn enviados

router.get('/send/:send', async (req, res) => {
    try {
        const messageSend = await getSend(req.params.send);
        res.json(messageSend);
    } catch (error) {
        res.json({ error: error.message });
    }
});

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

router.get('/inbox/detail/:id', async (req, res) => {
    try {
        const byId = await getById (req.params.id);
        res.json(byId);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/inbox/arrRecibed/:id', async (req, res) => {
    try {
        const byMail = await arrByMail (req.params.id);
        res.json(byMail);
    } catch (error) {
        res.json({ error: error.message });
    }
});
// // Borro un viaje
// router.delete('/:idTrip', async (req, res) => {
//     try {
//         const result = await deleteByTripId(req.params.idTrip);
//         res.json(result);
//     } catch (error) {
//         res.status(422).json({ error: error.message });
//     }
// });

// // Actualizar
// router.put('/', async (req, res) => {
//     try {
//         const result = await updateByTripId(req.body);
//         res.json(result);
//     } catch (error) {
//         res.status(422).json({ error: error.message });
//     }
// });

module.exports = router;