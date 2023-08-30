const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getOneDog = require('../controllers/oneDog')
const getTemperaments = require('../controllers/temperaments');
const createDog = require('../controllers/newDog');
const { getDogs } = require('../controllers/searchDogs');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getDogs)
router.get('/dogs/:id', getOneDog)
router.get('/temperaments', getTemperaments)

router.post('/dogs', createDog)

module.exports = router;
