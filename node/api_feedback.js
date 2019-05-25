const express = require("express");
const router = express.Router();
const Feedback = require("./models/feedback_schema")

router.post("/feedback", (req,res)=>{
    Feedback.create(req.body,(error,doc)=>{
        
    })
    res.end("Login")
})


router.post("/register", (req,res)=>{
    res.end("Register")
})


module.exports = router;