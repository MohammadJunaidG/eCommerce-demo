module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product",{
        id : {
           type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        name: {
            type: Sequelize.STRING,
            allowedNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowedNull: false
        },
        cost: {
            type: Sequelize.INTEGER,
            allowedNull: false
        }
    })
    return Product;
}