import React from 'react';
import games from '../data/output.json';

export class Games extends React.Component {


   render() {
       var gameHeader={
	    width: "100%",
	    float: "left"
	}
	var timeHeader={
		fontSize: "1.4em"
	}

	var teamLineup={
		width: "50%",
		float: "left"
	}
	var teamLineupRight={
		width: "50%",
		textAlign:"right",
		float: "left"
	}
	var teamHeader={
	    width: "50%",
	    float: "left",
	    textAlign:"center",
	    backgroundColor:"#1b2e4d",
	    color:"white",
	    fontSize: ".85em"
	}
	var indents = [];

	var lookupPicture=function(team){
		var location=team.substring(0,3);
		location="mlb pics/100"+location+".png";
		if(team=="New York Mets"){ location="mlb pics/100NYM.png";}
		if(team=="New York Yankees"){ location="mlb pics/100NYY.png";}
		if(team=="Chicago White Sox"){ location="mlb pics/100CWS.png";}
		if(team=="Chicago Cubs"){ location="mlb pics/100ChC.png";}
		if(team=="San Diego Padres"){ location="mlb pics/100SD.png";}
		if(team=="San Francisco Giants"){ location="mlb pics/100SF.png";}
		if(team=="Los Angeles Dodgers"){ location="mlb pics/100LAD.png";}
		if(team=="Los Angeles Angels"){ location="mlb pics/100LAA.png";}
		if(team=="St. Louis Cardinals"){ location="mlb pics/100StL.png";}
		if(team=="Tampa Bay Rays"){ location="mlb pics/100TB.png";}
		if(team=="Kansas City Royals"){ location="mlb pics/100KC.png";}
		return location;
	}
	var lineup=function(lineup){
		
		var lineups=[];
		if(lineup=="Pending"){
			lineups.push(<div className="player">
							  
							  <div className="namelf">Pending</div>
						      </div>);
				
		}else{
			for(var i=0;i<lineup.length;i++){
				lineups.push(<div className="player">
							  <div className="batting">{lineup[i].batting}</div>
							  <div className="pos">{lineup[i].position}</div>
							  <div className="namelf">{lineup[i].player}<span>&nbsp;({lineup[i].bats})</span></div>
						      </div>);
				
			}
		}
		return lineups;
			
	}

	for (var i = 0; i <= games.games.length-1; i=i+2){
		if(i==games.games.length-1){
			
				indents.push(
				<div>
				<div className="row">
				      <div className="six columns gameBox" >
					  <div style={gameHeader}>
					      <div style={gameHeader}>
						  <div className="row logoHeader">
						      <div className="topBox"><img src={lookupPicture(games.games[i].away.name)} /></div>
						      <div className="topBox" style={timeHeader}>@<br/>{games.games[i].time}</div>
						      <div className="topBox"><img src={lookupPicture(games.games[i].home.name)} /></div>
						  </div>
					      </div>
					      <div style={teamHeader} >
						  {games.games[i].away.name} ({games.games[i].away.record}) 
					      </div>
					      <div style={teamHeader}>
						  {games.games[i].home.name} ({games.games[i].home.record})
						  
					      </div>
					   </div>
					   
					  <div className="row" style={teamLineup}>
					      {lineup(games.games[i].away.lineup)}
					  </div>
					  <div style={teamLineupRight}>
					      {lineup(games.games[i].home.lineup)}
					  </div>
					  <div className="pitching" style={gameHeader}>

				<div className="pitcher">
						<div className="pitcherDiv">{games.games[i].away.pitcher.name} ({games.games		[i].away.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i].away.pitcher.pitcherRecord} ERA: {games.games[i].away.pitcher.pitcherEra}</div>
						  
					      </div>
					      <div className="pitcher">
						<div className="pitcherDiv">{games.games[i].home.pitcher.name} ({games.games		[i].home.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i].home.pitcher.pitcherRecord} ERA: {games.games[i].home.pitcher.pitcherEra}</div>
						   
					      </div>

					  </div>
				       </div>
				</div>
			</div>);
		}
		else{
			  indents.push(
			<div>
				<div className="row">
				      <div className="six columns gameBox" >
					  <div style={gameHeader}>
					      <div style={gameHeader}>
						  <div className="row logoHeader">
						      <div className="topBox"><img src={lookupPicture(games.games[i].away.name)} /></div>
						      <div className="topBox" style={timeHeader}>@<br/>{games.games[i].time}</div>
						      <div className="topBox"><img src={lookupPicture(games.games[i].home.name)} /></div>
						  </div>
					      </div>
					      <div style={teamHeader} >
						  {games.games[i].away.name} ({games.games[i].away.record}) 
					      </div>
					      <div style={teamHeader}>
						  {games.games[i].home.name} ({games.games[i].home.record})
						  
					      </div>
					   </div>
					   
					  <div className="row" style={teamLineup}>
					       {lineup(games.games[i].away.lineup)}
					    
					  </div>
					  <div style={teamLineupRight}>
					      {lineup(games.games[i].home.lineup)}
					  </div>
					  <div className="pitching" style={gameHeader}>

					      <div className="pitcher">
						<div className="pitcherDiv">{games.games[i].away.pitcher.name} ({games.games		[i].away.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i].away.pitcher.pitcherRecord} ERA: {games.games[i].away.pitcher.pitcherEra}</div>
						  
					      </div>
					      <div className="pitcher">
						<div className="pitcherDiv">{games.games[i].home.pitcher.name} ({games.games		[i].home.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i].home.pitcher.pitcherRecord} ERA: {games.games[i].home.pitcher.pitcherEra}</div>
						   
					      </div>

					  </div>
				       </div>

				     <div className="six columns gameBox" >
					  <div style={gameHeader}>
					      <div style={gameHeader}>
						  <div className="row logoHeader">
						      <div className="topBox"><img src={lookupPicture(games.games[i+1].away.name)} /></div>
						      <div className="topBox" style={timeHeader}>@<br/>{games.games[i+1].time}</div>
						      <div className="topBox"><img src={lookupPicture(games.games[i+1].home.name)} /></div>
						  </div>
					      </div>
					      <div style={teamHeader} >
						  {games.games[i+1].away.name} ({games.games[i+1].away.record})
					      </div>
					      <div style={teamHeader}>
						  {games.games[i+1].home.name} ({games.games[i+1].home.record})
						  
					      </div>
					   </div>
					  <div className="row" style={teamLineup}>
					      {lineup(games.games[i+1].away.lineup)}


					  </div>
					  <div style={teamLineupRight}>
					      {lineup(games.games[i+1].home.lineup)}
					  </div>
					  <div className="pitching" style={gameHeader}>

					            <div className="pitcher">
						<div className="pitcherDiv">{games.games[i+1].away.pitcher.name} ({games.games		[i+1].away.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i+1].away.pitcher.pitcherRecord} ERA: {games.games[i+1].away.pitcher.pitcherEra}</div>
						  
					      </div>
					      <div className="pitcher">
						<div className="pitcherDiv">{games.games[i+1].home.pitcher.name} ({games.games		[i+1].home.pitcher.pitcherHand})  </div>
						<div className="pitcherDiv">W-L: {games.games[i+1].home.pitcher.pitcherRecord} ERA: {games.games[i+1].home.pitcher.pitcherEra}</div>
						   
					      </div>


					  </div>
				       </div>
			      </div>
			</div>
		

			);
		}

		

	}
	return (
	   <div>
	    {indents}
	   </div>
	);
   }
}
