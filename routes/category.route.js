const categoryController = require('../controllers/category.controller')
const {authJwt, requestValidator} = require('../middlewares')

module.exports = (app) =>{

    app.post("/ecomm/api/v1/categories", 
        [   authJwt.verifyToken, 
            authJwt.isAdmin, 
            requestValidator.validateCategoryRequest 
        ],
        categoryController.create
    );
    
    app.get("/ecomm/api/v1/categories", 
            categoryController.findAll
    );

    app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);

    app.put("/ecomm/api/v1/categories/:id", 
        [   authJwt.verifyToken, authJwt.isAdmin, authJwt.isAdmin, 
            requestValidator.validateCategoryRequest
        ], 
        categoryController.update
    );

    app.delete("/ecomm/api/v1/categories/:id", 
        [   authJwt.verifyToken, 
            authJwt.isAdmin
        ], 
        categoryController.delete
    );

}