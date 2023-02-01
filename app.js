// 1st step
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")  //body-parser ek middileware hai jo ki hum use kar sakte hai to hum app.use(body-parser.Json) likhe

const port = 8000;
const fs = require("fs");
// for saving the database in mongodb
const mongoose = require('mongoose');

app.use(bodyParser.json())
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false)
   mongoose.connect('mongodb://127.0.0.1/contactdance');
}

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    dsc: String
  });
  var Contact = mongoose.model('contact', contactSchema);

// 2nd step static folder banana EXPRESS SPECIFIC STUFF EXPRESS SE RELETED ISME KARENGE SAB 
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// 3rd step PUG SPECIFIC STUFF
app.set("view engine", "pug");  // set the template engine as pug
app.set("views", path.join(__dirname, "views")) // Set the views directory

// 4th step ENDPOINTS
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render("home.pug", params)
});                          //render tab use karte hai jab hum template use karte hai aur status code 200 ka matlab  "OK" apka jo kam hai wo hogaya hai acchi tarah
app.get('/contact', (req,res)=>{
    const params = { }
    res.status(200).render("contact.pug", params)
});                          // contact wala click honeke baad waha pochayege wo get hai
// post req part of mongoose to sve database
app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      
    res.send("This item has been saved to the database")
   
    }).catch(()=>{
    res.status(400).send("item was not saved to the database")
})
    // res.status(200).render("contact.pug")
}); 

// app.post("/contact",(req,res)=>{
//     name =req.body.name
//     phone =req.body.phone
//     email =req.body.email
//     address =req.body.address
//     dsc =req.body.dsc
//     createpassword =req.body.createpassword
//     confirmpassword =req.body.confirmpassword
//     let stored =`The name of client ${name},phone number is ${phone},Client Email is ${email},the address of client ${address},the concern of client ${dsc}, createdpass ${createpassword},confirmedpass ${confirmpassword}`
//     fs.writeFileSync("stored.txt", stored)
//     const params = {"message": "Your form has been submitted succesfully"}
//     res.status(200).render("contact.pug", params)
    
// })



//5th step START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`)

})





// agar hume get.post ki req express se marni hai to hume npm install body-parser install karna padega


// var myData = new contact(req.body);
// myData.save().then(()=>{
//  res.send("This item has been saved to the database")
// }).catch(()=>{
//  res.status(400).send("Items was not saved to the database")
// });
// contact name  ka module humne phele hi banadiya hai   const contact = mongoose.model('contact', contactSchema); jaise hi contact pe hamare post req marega tab var myData = new contact(req.body); hum new contact object banayege req.body se jo req aarahi hai usme se content extract karke aur jo hai new contact object banalo  fir hum likhdege myData.save() ye jo save hai usko save kardega but ye save karne ke sath sath promise return karega to wo promise return karega to hume likhna padega .then aur uske andar hum send kardege aisa likh ki database saved hogai hai aur ussi ke sath sath  koi error aajayega to hum .catch karege aur uske andar uska status 400 code dedege aur send kardege response ke tor per
// bootstrap ke components me jaake alerts wala bhi use kar sakte hai hum








































// 1st stem npm init karo package.json banaya fir 2nd step npm install express karo terminal ke steps hai ye 3rd step npm install pug
// views me saare template aajayegi pug wagera ki