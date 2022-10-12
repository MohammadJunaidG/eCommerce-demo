const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../configs/db.Config');
const dbSetting = dbConfig[env];

const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInformation,
    dbSetting.pool,
);

const db = {sequelize, Sequelize}
db.user = require('./user.model')(sequelize, Sequelize)
db.product = require('./product.model')(sequelize, Sequelize)
db.category = require('./category.model')(sequelize, Sequelize)
db.cart = require('./cart.model')(sequelize, Sequelize)
db.role = require('./role.model')(sequelize, Sequelize)

//user to role has many to many relationship.
db.user.belongsToMany(db.role,{
    through: "user_roles",
    foreignKey : "user_id",
    otherKey: "role_id"
})

db.role.belongsToMany(db.user,{
    through: "user_roles",
    foreignKey : "role_id",
    otherKey: "user_id"
})
//User to cart has one to may relationship
db.user.hasMany(db.cart);

//category to product has one to may relationship
db.category.hasMany(db.product);

//product to cart has many to many relationship.
db.product.belongsToMany(db.cart,{
    through: "product_carts",
    foreignKey : "product_id",
    otherKey: "cart_id"
})

db.cart.belongsToMany(db.product,{
    through: "product_carts",
    foreignKey : "cart_id",
    otherKey: "product_id"
})

db.ROLES = ['customer', 'admin' ]


module.exports = db;