const express=require("express");
const User=require('../models/user.js');
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');
const app=express();

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));
exports.getData=(req,res,next)=>{
  User.find().then(users=>{
    res.status(200).json({
      
      users:users
  })
}).catch(err=>{
    res.status(500).json({
      message:'Failed to fetch Users'
    });

  })
}

exports.postData=(req,res,next)=>{
  const error=validationResult(req);
  if(!error.isEmpty()){
    res.status(422).json({
      message:'Please enter a valid Phone Number'
    });
    next();
  }
  const name=req.body.name;
  const phone=req.body.phone;
  const email=req.body.email;
  const dob=req.body.dob;
  //store in
  const user=new User({
    name:name,
    phone:phone,
    email:email,
    dob:dob
  })
  user.save().then(result=>{
    res.status(201).json({
      message:'added successfully',
      post:result
    })
    return transporter.sendMail({
      to:email,
      from:'ritesharora2909@gmail.com',
      subject:'Form filled Successfully',
      html:'<h1>Thank you for filling form</h1>'
    }).then(sent=>{
      console.log("email sent");
    }).catch(err=>{
    console.log(err);
  });
})
}
