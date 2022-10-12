const jwt = require("jsonwebtoken");
const secretKey = require('../configs/secret.config')
const db = require("../models")
const User = db.user;
const Cart = db.cart;


const verifyToken = (req, res, next) =>{ 

    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).json('No token provided')
    }
    jwt.verify(token, secretKey.secret, (err, decodedToken) =>{
        if(err){
            return res.status(403).json('Unauthorized! Incorrect Token.')
        } 
        req.userId = decodedToken.id;
        next();
    })
}

const isAdmin = (req, res, next) =>{

    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i =0; i<roles.length; i++){
                if(roles[i].name ==='admin'){
                    next();
                    return;
                }
            }
            res.status(403).json('Require ADMIN role.')
            return;
        })
    })
}



const authjwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}

module.exports = authjwt;