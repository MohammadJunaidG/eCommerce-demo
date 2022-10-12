module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category",{
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
        }
    })
    return Category;
}