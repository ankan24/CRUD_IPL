const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const path = require("path");

require('dotenv').config(); 

const homeRoute = require('./routes/home.route.js') 
const blogRoute = require('./routes/blog.route.js')
const contactRoute = require('./routes/contact.route.js')
const aboutRoute = require('./routes/about.route.js');

const app = express();  


// app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/',homeRoute);
app.use('/blog', blogRoute);
app.use('/contact',contactRoute);
app.use('/about',aboutRoute);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('Connect to Mongoose server')
).catch((err)=>console.log('Error connecting to Mongoose server',err))



module.exports = app;
module.exports.handler = serverless(app);

// app.listen(3000,(err)=>{
//     if(err) throw err;
//     console.log('Server is running on port 3000');
// })
