const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api',
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Connection Successfull');
    else
    console.log('Connection Failed \n Error:' +JSON.stringify(err,undefined,2));
});


app.listen(3000,()=>console.log("Express Server is Running on Port Number : 3000"));

// To get All Users
app.get('/Users',(req,res)=>{
    mysqlConnection.query('select * from Users',(err,result,fields)=>{
        if(!err)
       // console.log(rows);
        res.send(result);
        else
        console.log(err);
    })
});

//To get Users by id
app.get('/Users/:id',(req,res)=>{
    mysqlConnection.query('select * from Users where id =?',[req.params.id],(err,result,fields)=>{
        if(!err)
       // console.log(rows);
        res.send(result);
        else
        console.log(err);
    })
});

//To delete Users by id
app.delete('/Users/:id', (req, res) => {
    mysqlConnection.query('delete from  Users where id = ?', [req.params.id], (err, result, fields) => {
        if (!err)
            // console.log(rows);
            res.send("DELETED SUCCESSFULLY");
        else
            console.log(err);
    })
});


//To add Users 
app.post('/Users', (req, res) => {
    let name = req.body.name;
    let contact =req.body.contact;
    let email = req.body.email;
    let address = req.body.address;   
    mysqlConnection.query('INSERT INTO Users (name,contact, email,address) VALUES ("'+name+'","'+contact+'","'+email+'","'+address+'")', (err, result, fields) => {
        if (!err)
            // console.log(rows);
            res.send("Inserted Successfully");
        else
            console.log(err);
    })
});



//To edit Users 
app.put('/Users/:id', (req, res) => {
    let name = req.body.name;
    let contact = req.body.contact;
    let email = req.body.email;
    let address = req.body.address;
    mysqlConnection.query('UPDATE Users set name ="' + name + '" ,contact = "' + contact + '" , email ="' + email + '" , address = "' + address + '" WHERE id = ?',[req.params.id], (err, result, fields) => {
        if (!err)
            // console.log(rows);
            res.send("Updated Successfully");
        else
            console.log(err);
    })
});