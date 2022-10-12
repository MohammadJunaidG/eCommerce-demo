const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('../configs/secret.config');
const { user } = require('../models');
const db = require('../models')
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op

exports.signUp = (req, res) =>{

    const userObj = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }
    User.create(userObj).then(user =>{
        if(req.body.roles){
            Role.findAll({
                where: { name: {[Op.or]: req.body.roles}}
            }).then(roles =>{ 
                user.setRoles(roles).then(()=>{
                    console.log("User created.")
                    res.status(201).send({ message: "User registered successfully."})
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                console.log("User created.")
                res.status(201).send({ message: "User registered successfully."})
            })
        }
    }).catch(err => {
        console.log("Error while creating user.", err)
        res.status(500).send({message: "Some internal server error."})
    })
}

exports.signIn = (req, res) =>{

    User.findOne({
        where: {email: req.body.email}
    }).then(user =>{
        if(!user){
            return res.status(404).send({message: "User not found."})
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordIsValid){
            return res.status(404).send({message: "In-correct password."})
        }
        const token = jwt.sign({id:user.id}, secretKey.secret, {expiresIn: 3000})
        const authorities = [];
        user.getRoles().then(roles=>{
            for(let i =0; i<roles.length; i++){
                authorities.push(`Role_${roles[i].name.toUpperCase()}`)
            }
        }).then(()=>{
            res.status(200).send({
                username : user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err =>{
        console.log("Error while signIn.", err)
        res.status(500).send({message: "Some internal server error."})
    })
}