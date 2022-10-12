const authController = require('../controllers/auth.controller')
const verifySignup = require('../middlewares/verifySignup')
const reqValidator = require('../middlewares/requestValidator')

module.exports = (app) =>{

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/ecomm/api/v1/auth/signup", 
        [   reqValidator.validateSignupRequest, 
            verifySignup.checkDuplicateUernameOrEmail, 
            verifySignup.checkRolesExisted
        ], 
        authController.signUp
    );
    
    app.post("/ecomm/api/v1/auth/signin", authController.signIn);
}