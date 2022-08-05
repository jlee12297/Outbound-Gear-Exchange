const sequelize = require("../config/connection");

const seedCategories = require('./category-seeds');
const seedGear = require('./gear-seeds');
const seedUsers = require('./user-seeds');
const seedOrders = require('./order-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedCategories();
    console.log('\n----- CATEGORIES SYNCED -----\n');
    await seedGear();
    console.log('\n----- GEAR LOADED -----\n');
    await seedUsers();
    console.log('\n----- FRIENDS CONNECTED -----\n');
    await seedOrders();
    console.log('\n----- ORDERS PREPARED -----\n');

    process.exit(0);
};

seedAll();