var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Post = require('../models/postModels')
const dotenv = require('dotenv')

const DB = process.env.DATABASE

mongoose.connect(DB)
.then(()=>console.log('資料連接成功'))

/* GET users listing. */
router.get('/',async function(req, res, next) {
 try{
    const posts = await Post.find();
      res.status(200).json({
      "status":"success",
      "data":posts
  })
 }catch(err){
     res.status(400).json({
         "status":"failed",
         "message":err
     })
 }
});

//Post
router.post('/',async function(req, res, next) {
    try{
        const body = req.body
        const posts = await Post.create(body)
        res.status(200).json({
            "status":"success",
           "data":posts
        })
    }catch(err){
        res.status(400).json({
            "status":"failed",
            "message":err
        })
    }
})

//DELETE
router.delete('/',async function(req, res, next) {
    try{
        await Post.deleteMany({})
        const posts = await Post.find();
        res.status(200).json({
            "status":"success",
           "data":posts
        })
    }catch(err){
        res.status(400).json({
            "status":"failed",
            "message":err
        })
    }
})

//DELETE ONE
router.delete('/:id/',async function(req, res, next) {
    try{
        const id = req.params.id
        const result =  await Post.findByIdAndDelete(id)
        if(result != null){
            res.status(200).json({
               "status":"success",
               "data":result
            })
        }else{
            res.status(400).json({
                "status":"failed",
                "data":"未找到此id"
             })
        }
    }catch(err){
        res.status(400).json({
            "status":"failed",
            "data":err
         })
    }
})


//PATCH
router.patch('/:id/',async function(req, res, next) {
    try{
        const body = req.body
        const id = req.params.id
        const result = await Post.findByIdAndUpdate(id,body)
        if(result != null){
            res.status(200).json({
               "status":"success",
               "data":result
            })
        }else{
            res.status(400).json({
                "status":"failed",
                "data":"未找到此id"
             })
        }
    }catch(err){
        res.status(400).json({
            "status":"failed",
            "data":err
         }) 
    }
})

//OPTIONS
router.options('/',async function(req, res, next) {
    res.status(200).json({
        "status":"success"
     })
})


module.exports = router;