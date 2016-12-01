import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';


var lineups=require('./lineups');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var config = require('./config'); 
var User   = require('./models/user');





// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));



//api
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
   res.sendFile(__dirname + "/" + "home.htm" );
   console.log("connection: "+mongoose.connection.readyState);
});


app.get('/setup', function(req, res) {
  var admin = new User({ 
    name: 'Admin', 
    password: 'qwerty1',
    admin: true 
  });

  admin.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.use('/api', lineups);
//end api


// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});



