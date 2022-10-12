module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",{
        username : {
            type: Sequelize.STRING,
            allowedNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowedNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowedNull: false
        }
    })
    return User;
}