const express = require("express");
const router = express.Router();
const jwt = require('./jwt');
const Trans = require('./models/trans_schema')

router.post("/transaction", jwt.verify, async (req, res) => {
    req.body.staff_id = req.userId;
    try {
      let doc = await Trans.create(req.body);
      res.json(doc);
    } catch (err) {
      res.json(err);
    }
  });

// router.get("/transaction", (req,res)=>{
//     res.end("Query transaction")
// })

router.get("/transaction",(req,res)=>{
    Trans.aggregate([
        {$match:{}},
        {
            $lookup:{
                localField:"staff_id",
                foreignField:"_id",
                from:"users",
                as:"staff_id"
            }
        },{
            $project:{
                "staff_id.password":0
            }
        },
        { $unwind: "$staff_id" }
    ]).then(result=>{
        let obj = result.map(item=>{
            item.staff_id = item.staff_id.username
            return item
        })
        res.json(obj)
    })
})

// router.get("/transaction/", function(req, res) {
//     Trans.aggregate([
//       { $match: {} },
//       {
//         $lookup: {
//           from: "users",
//           localField: "staff_id",
//           foreignField: "_id",
//           as: "staff_id"
//         }
//       },
//       {
//         $project: {
//           "staff_id.password": 0
//         }
//       },
//       { $unwind: "$staff_id" }
//     ])
//       .sort({ timestamp: -1 })
//       .then(transaction => {
//         const resObj = transaction.map(value => {
//           value.staff_id = value.staff_id.username;
//           return value;
//         });
//         res.json(resObj);
//       })
//       .catch(err => {
//         res.status(400).json({ err: err.message });
//       });
//   });
  
  router.get("/transaction/id/:id", function(req, res) {
    Trans.aggregate([
      { $match: { transaction_id: Number(req.params.id) } },
      { $lookup: {
          from: "users",
          localField: "staff_id",
          foreignField: "_id",
          as: "staff_id"
        }
      },
      { $project: {  "staff_id.password": 0 } },
      { $unwind: "$staff_id" }
    ]).then(transaction => {
        const resObj = transaction.map(value => {
          value.staff_id = value.staff_id.username;
          return value;
        });
        res.json(resObj[0]);
      })
  });


module.exports = router;