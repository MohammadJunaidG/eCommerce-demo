const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");

const bodyParser = require("body-parser")
app.use(bodyParser.json());

/**
 * Code for the table initialization
 */

const db = require("./models");
const Category = db.category;
const Product = db.product;
const Roles = db.role;



/**
 * Setup the relationship between the catergory and product tables
 */


Category.hasMany(Product) // One to Many relationship
//db.category.hasMany(db.product) // One to Many relationship
//db.product.belongsTo(db.category) // One to Many relationship

/**
 * Create the table.
 */
db.sequelize.sync({ force: true }).then(() => {
    console.log("Table has ben dropped and recreated");
    init();
}).catch(err => {
    console.log("Error in creating table.", err)
})



// This function should execute at begining when app starts

function init(){
    /**
     * create some initial catergoies
     * Use bulkCreate sequelize function fo insertion of entries.
     */
    var catergoies = [
        {
            name: 'electronics',
            description: "This catagory is for electronic products."
        },
        {
            name: 'Furnitures',
            description: "This catagory is for Furnitures items."
        },
    ]

    Category.bulkCreate(catergoies).then(()=>{
        console.log("Categories are added");
    }).catch(err => {
        console.log("***Error in initializing the categories.***", err.message);
    })

    var roles = [
        {
            id : 1,
            name: 'customer'
        },
        {
            id : 2,
            name: 'admin'
            
        },
    ]

    Roles.bulkCreate(roles).then(()=>{
        console.log("Initial Roles are created.");
    }).catch(err => {
        console.log("Error in creating roles", err.message);
    })
}

require('./routes/auth.route')(app);
require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/cart.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log("Server has started at port number : ", serverConfig.PORT);
})