const router = require('express').Router();
const userRoutes = require('./userRoutes');
const GearRoutes = require('./gearRoutes');
const categoriesRoute = require('./categories');
const ordersRoute = require('./orders');



router.use('/users', userRoutes);
router.use('/gears', GearRoutes);
router.use('/orders', ordersRoute);
router.use('/categories', categoriesRoute)

module.exports = router;
