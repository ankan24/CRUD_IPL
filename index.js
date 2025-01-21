const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser')
const homeRoute = require('./routes/home.js') 
const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',homeRoute);

mongoose.connect('mongodb+srv://demouser:demo123@cluster0.ap4zayq.mongodb.net/IPL?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('Connect to Mongoose server')
).catch(()=>console.log('Error connecting to Mongoose server'))



app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('Server is running on port 3000');
})