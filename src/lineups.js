var express=require('express');
var app = express();
var http = require('http');
var apiRoutes = express.Router(); 
var config = require('./config'); 
var User= require('./models/user');
var jwt    = require('jsonwebtoken'); 
var parse = require('./parse.js');

app.set('superSecret', config.secret);

apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn : 60*60*24*4
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});




apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});




apiRoutes.get('/', function(req, res) {
  res.send('Hello! '+User);
  //res.json({ message: User });
});


var str='';
var options = {
    host: 'www.rotowire.com',
    path: '/baseball/daily_lineups.htm',
};

apiRoutes.get('/lineups',function(req,res){
    var jsonRes;
    callback = function(response) {
    	response.on('data', function (chunk) {
		str+=chunk;
    	});
    	response.on('end', function () {
		jsonRes=parse.parse(str);
		res.send(jsonRes);  	
    	});    
    }
    var req=http.request(options,callback).end();
});


//for testing
var fs = require("fs");
apiRoutes.get('/lineupsFromTestPage',function(req,res){
    var jsonRes;
    var str=fs.readFileSync('./src/rotowire_htm_test.htm');
    jsonRes=parse.parse(str.toString());
    res.send(jsonRes); 	
});



apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 


module.exports = apiRoutes;

