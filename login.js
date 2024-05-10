const mysql = require("mysql2");
const express = require("express");
const bodyParser = require('body-parser');

// app
const app = express();
app.use(express.static("html"));
app.use(express.static("css"));
app.use(express.static("images"));
app.use(express.static("js"));
app.use(express.static("fonts"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/cart.html");
});

app.get("/cart.html",function(req,res){
    res.sendFile(__dirname + "/cart.html");
});

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hetal@333',
    database: 'cart',
  });
  
  // Connect to the MySQL database
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    console.log('Connected to the MySQL database');
  });
  
  // Define a route to handle form submissions
  app.post('/submit_form', (req, res) => {
    
    const id = 0 ;
    const name1 = req.body.name ;
    const address = req.body.Street_address;
    const city = req.body.Towncity ; 
    const country = req.body.country ;
    const state = req.body.state ;
    const postcode = req.body.PostcodeZIP ;
    const email = req.body.email ;
    const phone = req.body.phone ; 
    const message = req.body.message
    const age = req.body.age ;
    console.log(req.body)
   //      Execute the SQL query
     db.query(
         'INSERT INTO ship (ID, Name1, address, city, country, state, postcode, email, phone, message, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [id, name1, address, city, country, state, postcode, email, phone, message, age],
         (err, results) => {
           if (err) {
             console.error('Error inserting data into the database: ', err);
            // Display an error message on the same page or redirect to an error page
             res.send('Error submitting the form. Please try again.');
           } else {
            console.log('Form data inserted into the database');
              //Display a success message on the same page or redirect to a success page
             //res.send('Form submitted success');
             res.redirect('/thank.html');
           }
   });




});
app.listen(5505);
module.export = db
module.exports = app