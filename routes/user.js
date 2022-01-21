const express=require("express");

const router=express.Router();
const {body}=require('express-validator/check');

const userControllers=require('../controllers/user.js');

router.get('/data',userControllers.getData);

router.post('/',[
  body("phone")
  .trim()
  .isLength({min:10})
],userControllers.postData);

module.exports=router;
