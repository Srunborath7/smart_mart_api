const User = require('./user');
const Category = require('./category');
const Brand = require("./brand");
// USER → CATEGORY (1 to many)
User.hasMany(Category, {
    foreignKey: 'user_id',
    as: 'categories'
});

Category.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
Brand.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
module.exports = {
    User,
    Category,
    Brand
};