// Option 2 - To reference hidden 'db' folder in root
const express = require('express');
const path = require('path');
const app = express();
const pgp = require('pg-promise')(); //Note the options ()

// Setting Express 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views')); 
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up Database Connection - Change here
const db = require('../db');  

app.get('/people', (req, res)=>{
    db.any("SELECT * FROM people LIMIT 6;")
    .then(
        rows => {
            console.log(rows); 
            res.json(rows);
        }
    )
    .catch(error=>{
        console.log(error);
    })
}); 

app.get('/', (req, res)=>{
    res.send("Home Page");
});

app.get('*', (req, res)=>{
    res.send("Any other routes here!");
});

app.listen(8080, ()=> console.log("Listening on PORT:8080..."));