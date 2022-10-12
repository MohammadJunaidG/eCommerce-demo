const { ROLES } = require('../models');
const db = require('../models')
const User = db.user;

const checkDuplicateUernameOrEmail = (req, res, next) => {
   
    User.findOne({where: {username: req.body.username}})
    .then(user=>{
        if(user) { 
            res.status(400).send({message: "Failed! Username aleady exists."})
            return;
        } 
      
        User.findOne({where: {email: req.body.email}})
        .then(user=>{
            if(user) { res.status(400).send({message: "Failed ! Email aleady exists."})
            return;
            }
            next();
        })
    })
}

const checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i =0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).send({
                    message: `Roles not found. ${req.body.roles[i]}`
                })
            }
        }
    }  next();
}
const verifySignup = {
    checkDuplicateUernameOrEmail : checkDuplicateUernameOrEmail,
    checkRolesExisted : checkRolesExisted
}

module.exports = verifySignup;