const validateCategoryRequest = (req, res, next) =>{
    if(!req.body.name){
        return res.status(400).json("Category name not provided.")
    }
    if(!req.body.description){
        return res.status(400).json("Category description not provided.")
    }
    next();
}

const validateProductRequest = (req,res, next)=>{
    if(!req.body.name){
        return res.status(400).json("Product name not provided.")
    }
    if(!req.body.description){
        return res.status(400).json("Product description not provided.")
    }
    if(!req.body.cost || req.body.cost <= 0){
        return res.status(400).json("Product cost not provided or is less than zero.")
    }

    next();
}

const validateSignupRequest = (req,res, next)=>{

    if(!req.body.username){
        return res.status(400).json("Username name not provided.")
    }
    if(!req.body.email){
        return res.status(400).json("Email ID not provided.")
    }
    if(!req.body.password){
        return res.status(400).json("Product cost not provided or is less than zero.")
    }
    
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(!strongRegex.test(req.body.password)){
        let msg =  `The string must be eight characters or longer. \nThe password must contain at least:\n\t 1 lowercase alphabetical character,\n\t 1 uppercase alphabetical character,\n\t 1 numeric character,\n\t 1  special character.`
        res.status(400).send(msg)
        return;
    }

    next();
}

const validateCategoryPassedInReqParam = (req, res, next) => {
    const categoryId = parseInt(req.params.categoryId);
    if (categoryId) {
        //Check if the category exists, if not return the proper error message
        Category.findByPk(categoryId).then(category => {
            if (!category) {
                res.status(400).send({
                    message: `category id passed is not available : ${categoryId}`
                })
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message: "Some Internal error while storing the product!"
            });
            return;
        });
    } else {
        res.status(400).send({
            message: `category id passed is not available `
        })

        return;

    }
}

module.exports ={
    validateSignupRequest : validateSignupRequest,
    validateProductRequest : validateProductRequest,
    validateCategoryRequest : validateCategoryRequest,
    validateCategoryPassedInReqParam : validateCategoryPassedInReqParam
}