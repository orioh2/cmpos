const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
var bcrypt = require('bcryptjs');
var jwt = require('./jwt')

router.post("/login", (req,res)=>{   
    //res.end("Login")
    const{username,password} = req.body;
    Users.findOne({username:username},(error,doc)=>{
        if(error){
            res.status(500).end("Internal Process Error")
        }else if(!doc){
            res.status(200).send({ auth: false, token: "", msg: "Invalid username" })  
        }else{
            const isValidPassword = bcrypt.compareSync(password,doc.password)
            if(isValidPassword == false){
                res.status(200).send({ auth: false, token: "", msg: "Invalid Password" }) 
            }else{
                const payload = { id: doc._id, level: doc.level, username: doc.username };
                const token = jwt.sign(payload);
                res.json({ auth: true, token: token, msg: "success" });
                
            }
        }
    })
})


router.post("/register", (req,res)=>{
   const{password} = req.body
   const hashPassword = bcrypt.hashSync(password,8);
   req.body.password = hashPassword;
   Users.create(req.body, (err, doc)=>{
        if (err) {
            res.status(500).json({result: "nok"})
        }else{
            const token = 
            jwt.sign({username:req.body.username, 
                 id: doc._id});

            res.json({result:"ok", token:token})
        }
   })
    
})


module.exports = router; //export router ไปให้ api