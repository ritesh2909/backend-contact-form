const express=require("express");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require('body-parser');
const userRoutes=require('./routes/user.js')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/user-form',userRoutes);

mongoose.connect("mongodb+srv://ritesh:ritesh2909@cluster0.eaoyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(result=>{
  console.log("connected");
  app.listen(8080);
}).catch(err=>{
  console.log(err);
})
