const express=require('express');
const path=require('path');
const port=80;
const fs=require('fs');
const bodyparser=require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const app=express();

//Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

const Contact = mongoose.model('Contact', contactSchema);

//Express
app.use('/static', express.static('static'))
//app.use((express.static('static',options)))
app.use(express.urlencoded())

//pug
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))


//Endpoints
app.get('/',(req,res)=>{
    const params={};
    // res.status(200).render('index.pug',params);
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={};
    // res.status(200).render('index.pug',params);
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save();
    // myData.save().then(()=>{
    //     res.send("This item has been saved to the database");
    // }).catch(()=>{
    //     res.status(400).send("Item was not saved to the database");
    // });
    //res.status(200).render('contact.pug');
})



app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})