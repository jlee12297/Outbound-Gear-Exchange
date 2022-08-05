const router = require('express').Router();
const userRoutes = require('./userRoutes');
const GearRoutes = require('./gearRoutes');

router.use('/users', userRoutes);
router.use('/gears', GearRoutes);

module.exports = router;
