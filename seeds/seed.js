const sequelize = require('../config/connection');
const { User, Gear } = require('../models');

const userData = require('./userData.json');
const gearData = require('./gearData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const gear of gearData) {
    await Gear.create({
      ...gear,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
