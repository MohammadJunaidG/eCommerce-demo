const { category } = require('../models');
const db = require('../models')
const Category = db.category;

exports.create = (req, res) => {
    const categoryObj = {
        name : req.body.name,
        description: req.body.description
    }

    Category.create(categoryObj).then((category)=>{
        res.status(201).send(category)
        console.log(`Category name : [ ${category.name}] got inserted in the db`);
    }).catch(err =>{
        console.log(`Error occured while adding the category. ${err.message}`);
        res.status(500).send({  message: "Some internal error happened" })
    })

}

exports.findAll = (req, res) => {

    const catergoryName = req.query.name
    var promise;
    if(catergoryName){
        promise = Category.findAll({
            where: { name: catergoryName }
        })
    } else {
        promise = Category.findAll()
    }
    promise.then(result=> {
        res.status(200).send(result)
    })
    .catch(err =>{
        console.log(err.message)
        res.status(500).send({ message: "Some internal server error." })
   })
}

exports.findOne = (req, res) => {

    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(category =>{
        res.status(200).send(category)
    }).catch(err => {
        res.status(500).send({message: "Some internal server error"})
        console.log(`Some error ocuured ${err}`);
    })
}

exports.update = (req, res) => {
    
    const category = {
        name: req.body.name,
        description : req.body.description
    }
    const categoryId = req.params.id


    Category.update(category, {
        where: {id: categoryId},
        returning: true
    }).then(() => {
        Category.findByPk(categoryId).then(result=>{
            res.status(201).send(result)
        })
    }).catch(err=>{
        res.status(500).send({message: "Some internal server error"})
        console.log(`Some error ocuured ${err}`);
    })
}

exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({where: {id: categoryId}})
    .then(()=>{
        res.status(200).send({ 
            message: "Category has been deleted from db records."
        })
    }).catch(err => {
        console.log(err.message)
        res.status(500).send({
            message : "Server Internal error."
        })
    })
}