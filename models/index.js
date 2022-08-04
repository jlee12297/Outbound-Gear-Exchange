const Gear = require('./Gear');
const User = require('./User');
const Orders =require('./Orders');
const Category = require('./Category');



User.hasMany(Orders,{
    foreignKey:'order_id'
});

Orders.belongsTo(User, {
    foreignKey: 'adventurer_id'
});

Orders.belongsTo(Gear, {
    foreignKey: 'gear_id'
});

Gear.hasMany(Orders, {
    foreignKey: 'order_id'
});

Gear.belongsTo(User, {
    foreignKey: 'gearhead_id'
});

User.hasMany(Gear, {
    foreignKey: 'gear_id'
});

Category.belongsTo(Gear, {
    foreignKey: 'gear_id'
});

Gear.hasMany(Category, {
    foreignKey: 'category_id'
});

module.exports = {
    Gear,
    User,
    Orders,
    Category
}
