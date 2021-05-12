const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/Dance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = 800;


var contactschema = new mongoose.Schema({ 
    name: String, 
    PhoneNo: String ,
    email: String ,
    address: String ,
    Des: String ,
});

var Contact =mongoose.model("Contact",contactschema)

app.use( "/static", express.static("static"));
app.use(express.urlencoded())


app.set("view engine" , "pug");
app.set("views", path.join(__dirname,"views"))

app.get('/' , (req,res) =>{
    const params = {}
    res.status(200).render('home.pug');
} )

app.get('/contact' , (req,res) =>{
    const params = {}
    res.status(200).render('contact.pug');
} )
app.post('/contact' , (req,res) =>{
    var Data = new Contact(req.body);
    Data.save().then(() =>{
        res.send("Data has been successfully saved")
     }).catch(() =>{
        res.status(404).send("Data not uploaded")
     });
    
    //  res.status(200).render('contact.pug');
} )

 
app.listen(port,() =>
{
    console.log(`This application successfully started on port ${port}`)
})

