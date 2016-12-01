import React from 'react';


export class Client extends React.Component {
   render() {
	var asdf="asdfasdfad"
	return (
<pre><code>{`var request = require('request');
var http = require('http');
var callback = function(response){
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
	if(body!=null){
	    	print(body);
	}

   });
}
request({
    url: "http://localhost:3000/api/authenticate",
    method: "POST",
    json: true,   // <--Very important!!!
    body: {
	name:'Admin',
        password:'qwerty1'
    }
}, function (error, response, body){
    	if(error){console.log(error)}


	var options = {
	    host: 'localhost',
	    port: '3000',
	    path:'/api/lineupsFromTestPage',
	    headers: {
		    'x-access-token':response.body.token,
		    "Content-Type": "application/json"
	    }
	 };
	var req = http.request(options, callback);
	req.end();

});`}
			</code></pre>);
   }			   
}
