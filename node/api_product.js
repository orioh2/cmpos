var express = require('express');
var router = express.Router();
const Product = require("./models/product_schema");
const jwt = require('./jwt')
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');

router.get("/product/id/:id",jwt.verify,(req,res)=>{
  Product.findOne({product_id:req.params.id},(err,doc)=>{
    if(err){
      res.status(500).json({result:"NOK"})
    }else{
      if(doc){
        res.json(doc);
      }else{
        res.json({});
      }
    }
  })
})

router.get("/product/name/:keyword",async (req,res)=>{
  let doc = await Product.find({name: new RegExp("^.*" + req.params.keyword + ".*$", "i")})
  res.json(doc)
})




router.delete("/product/id/:id", (req, res)=>{
  const query = {product_id : req.params.id};
  Product.findOneAndDelete(query, (err, doc)=>{

    if (err) res.json({result: "failed"});
    res.json({result: "success"});
  });
});

// Check Out of Stock
router.get("/product/out_of_stock", function(req, res) {
  console.log("out_of_stock");

  Product.count({ stock: 0 }, (err, result) => {
    if (err) throw err;

    res.json({ out_of_stock_product: result });
  });
});


router.post("/product",jwt.verify,(req, res)=> {  
  try {
    var form = new formidable.IncomingForm();
    var newname = Date.now();
    form.parse(req, async(err, fields, files) => {
               
      var oldpath = files.upload_file.path;
      var fileExtention = files.upload_file.name.split(".")[1];
      newname = `${newname}.${fileExtention}`
      var newpath = path.resolve(__dirname + "/uploaded/images/") +  "/" + newname;      

      await fs.move(oldpath, newpath);      
      fields.image = newname
      var result = await Product.create(fields);
      console.log("Add product with file: " + JSON.stringify(result))
      res.json(result)
    });
  } catch (err) {
    console.log("err : " + err);
  }
});

router.put("/product", (req, res)=> {  
  try {
    var form = new formidable.IncomingForm();
    var newname = Date.now();
    form.parse(req, async(err, fields, files) => {

      if (files.upload_file == null){
        const query = {product_id: fields.product_id};
        // Product.findOneAndUpdate(query, fields, (err, doc)=>{
        //   if (err) res.json({result: "failed"});
        //   console.log(JSON.stringify(doc))
        //   res.json({result: "success"});
        // });
        try {
          let doc = await Product.findOneAndUpdate(query, fields);
          console.log(JSON.stringify(doc));
          res.json({ result: "success" });
        } catch (err) {
          if (err) res.json({ result: "failed" });
        }

        return;
      } 

      var oldpath = files.upload_file.path;
      var fileExtention = files.upload_file.name.split(".")[1];
      newname = `${newname}.${fileExtention}`
      var newpath = path.resolve(__dirname + "/uploaded/images/") +  "/" + newname;      
      await fs.move(oldpath, newpath);      
      fields.image = newname
      const query = {product_id: fields.product_id};
      Product.findOneAndUpdate(query, fields, (err, doc)=>{
        if (err) res.json({result: "failed"});
        console.log(JSON.stringify(doc))
        res.json({result: "success"});
      });               
    });
  } catch (err) {
    console.log("err : " + err);
  }
});

router.get("/product",jwt.verify,(req,res)=>{
  // Product.find((err,doc)=>{
  //   res.json(doc)
  // })
  Product.find({}).sort([['product_id', -1]]).exec((err, result)=>{
    res.json(result);
  })
})


module.exports = router;