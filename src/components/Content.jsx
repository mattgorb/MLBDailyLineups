import React from 'react';

import {Games} from './Games.jsx';
import {Client} from './Client.jsx';


export class Content extends React.Component {
   render() {
      var intro={
          paddingTop: "6rem",
          paddingBottom: "3rem"
	}
var jsonStr={"games":[{"time":"3:10 PM ET","weather":" Wind 4 MPH In ","away":{"name":"St. Louis Cardinals","record":"80-71","HA":"Away","pitcher":{"name":"Luke Weaver","pitcherHand":"R","pitcherRecord":"1-3","pitcherEra":"3.21"},"lineup":[{"player":"Matt Carpenter","ID":"572761","position":"1B","bats":"L","batting":1},{"player":"Aledmys Diaz","ID":"649557","position":"SS","bats":"R","batting":2},{"player":"Jedd Gyorko","ID":"576397","position":"3B","bats":"R","batting":3},{"player":"Brandon Moss","ID":"461235","position":"LF","bats":"L","batting":4},{"player":"Randal Grichuk","ID":"545341","position":"CF","bats":"R","batting":5},{"player":"J. Hazelbaker","ID":"571757","position":"RF","bats":"L","batting":6},{"player":"Carson Kelly","ID":"608348","position":"C","bats":"R","batting":7},{"player":"Kolten Wong","ID":"543939","position":"2B","bats":"L","batting":8},{"player":"Luke Weaver","ID":"596133","position":"P","bats":"R","batting":9}]},"home":{"name":"Colorado Rockies","record":"72-79","HA":"Away","pitcher":{"name":"German Marquez","pitcherHand":"R","pitcherRecord":"0-0","pitcherEra":"5.06"},"lineup":[{"player":"C. Blackmon","ID":"453568","position":"CF","bats":"L","batting":1},{"player":"DJ LeMahieu","ID":"518934","position":"2B","bats":"R","batting":2},{"player":"Carlos Gonzalez","ID":"471865","position":"RF","bats":"L","batting":3},{"player":"Nolan Arenado","ID":"571448","position":"3B","bats":"R","batting":4},{"player":"Gerardo Parra","ID":"467827","position":"1B","bats":"L","batting":5},{"player":"Tom Murphy","ID":"608596","position":"C","bats":"R","batting":6},{"player":"J. Patterson","ID":"641958","position":"LF","bats":"L","batting":7},{"player":"Daniel Descalso","ID":"518614","position":"SS","bats":"L","batting":8},{"player":"German Marquez","ID":"608566","position":"P","bats":"R","batting":9}]}}]};
      return (
	<div>
              <div className="docs-section" style={intro} id="intro">
              	<h3>Daily MLB lineups API</h3>
              	<p>An isomorphic web application written with node and react.  Basic UI renders a sample API JSON response with API routes built in.  API parses RotoWire MLB daily lineups page (rotowire.com/baseball/daily_lineups.htm) and returns data in JSON format.  The application uses MongoDB and JSONWebToken for user authentication, along with several libraries for XML parsing for the API call.  
 </p>

		</div>
		<div id="json">
                <h5 style={{marginBottom: 0}} >Sample JSON response:</h5>
		<pre>
		{JSON.stringify(jsonStr)}
		</pre></div>
	      
	      <div id="games"><Games/></div>
	      
              <div className="docs-section" style={intro} id="client">
                  <h3>Sample NodeJs Client:</h3>
		  	<Client/>
              </div>



	</div>
      );
   }
}

