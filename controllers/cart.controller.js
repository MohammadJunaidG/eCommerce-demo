const db = require('../models')
const Cart = db.cart;
const Product = db.product;
const User = db.user;

exports.create= (req, res) => {

    const cartObj = {userId: req.userId }

    Cart.create(cartObj).then(cart=>{
        res.status(201).send(cart)
    }).catch(err=>{
        res.status(500).send({message: "Some internal server error occured."})
        console.log(err.message)
    })    
}

exports.update = (req, res) => {
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart =>{
        console.log(cart)
        Product.findAll({ where: { id: req.body.productIds}})
        .then(productList =>{
            if(!productList){
                res.status(400).send({message: "Added products doesn't exists."})
            }
            cart.setProducts(productList).then(()=>{
                let selectedProducts = [];
                var totalCost = 0;
                cart.getProducts().then(products=>{
                    for(let i=0; i<products.length; i++){
                        totalCost = totalCost + products[i].cost

                        selectedProducts.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].cost,
                        })
                    }
                    cart.cost = totalCost;
                    cart.save();
                    res.status(200).send({
                        id: cart.id,
                        selectedProducts: selectedProducts,
                        cost : totalCost 
                    })
                })
            })
        })
    })
}

/**
 * Controller to get the cart based on the cartId
 */
 exports.getCart = (req, res) => {
    
    const cartId = req.params.cartId
    
    Cart.findByPk(cartId).then(cart => {
        let totalCost = 0;
        const productsSelected = [];
        cart.getProducts().then(products => {
            for (i = 0; i < products.length; i++) {
               totalCost += products[i].cost;
                productsSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }

            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost:totalCost
            });
        });

    });

}