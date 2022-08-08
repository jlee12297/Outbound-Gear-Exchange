const User = require('./User');
const Gear = require('./Gear');
const Orders =require('./Orders');
const Category = require('./Category');

User.hasMany(Gear, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Gear.belongsTo(User, {
  foreignKey: 'user_id',
});

Category.hasMany(Gear, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

Gear.belongsTo(Category, {
  foreignKey: 'category_id'
})

module.exports = { User, Gear, Orders, Category };
