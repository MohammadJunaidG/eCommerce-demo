const db = require('../models')
const Product = db.product;

exports.create = (req, res) =>{
    const productObj = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId
    }

    Product.create(productObj).then(product=>{
        res.status(201).send(product)
        console.log("Product added in the database with name ", product.name);
    }).catch(err => {
        console.log("Error in creating Product in the database.", err)
        res.status(500).send({
            message: 'Some internal server error occured.'
        })
    })
}

exports.findAll = (req, res) =>{

    const productName = req.query.name;
    var promise;
    if(productName){
        promise = Product.findAll({ 
            where : {name: req.query.name}
        }).then((product) =>{ res.status(200).send(product) })
    }else{
        promise = Product.findAll()
    }
    promise.then((product)=>{
        res.status(200).send(product)
    }).catch(err => {
        console.log("Some error occured", err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    })
}

exports.findOne = (req, res) =>{
    const productId = req.params.id;
    Product.findByPk(productId).then(product=>{
        res.status(200).send(product)
    }).catch(err=>{
        console.log("Some error occured.", err)
        res.status(500).send({
            message: "Internal Server Error."
        })
    })
}

exports.update = (req, res) =>{
    const product = {
        name: req.body.name,
        desciprion : req.body.desciprion,
        cost: req.body.cost
    }
    const productId = req.params.id;

    Product.update(product, {
        retruning: true,
        where : { id: productId }
    }).then(() => {
        Product.findByPk(productId).then(product=>{
            res.status(200).send(product)
        })
    }).catch(err => {
        res.status(500).send({
            message: "Internal error occured"
        })
    })
}

exports.delete = (req, res) =>{
    const productId = req.params.id;

    Product.destroy({where: {id: productId}})
    .then(()=>{
        res.status(200).send({
            message: "Product has been deleted."
        })
    }).catch(err => {
        res.status(500).send({
            message: "Internal error occured."
        })
    })
}

exports.getProductsUnderCategory = (req, res) => {
    const categoryId = parseInt(req.params.categoryId);

    Product.findAll({
        where: {
            categoryId: categoryId
        }
    }).then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching  products based on the category id "
        })
    })

}
