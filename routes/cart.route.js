const cartController = require('../controllers/cart.controller')
const  {authJwt}  = require('../middlewares');

module.exports = (app) =>{
    app.post("/ecomm/api/v1/carts",authJwt.verifyToken, cartController.create);
    
    app.put("/ecomm/api/v1/carts/:id", [authJwt.verifyToken, authJwt.isAdmin], cartController.update);
    
    //Route for the GET request to get the product
    app.get("/ecomm/api/v1/carts/:cartId",[authJwt.verifyToken], cartController.getCart);
}