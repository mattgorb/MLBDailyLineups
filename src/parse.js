
var fs = require('fs')
var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;


var IDlookup = function (player) {
    var data = fs.readFileSync('./src/master.csv');//, function (err, data) {if (err) {return console.error(err);}
    var dataRowSplit = data.toString().split("\n");
    for (var i = 1; i < dataRowSplit.length - 1; i++) {
        if ((dataRowSplit[i].split(",")[1].toString() == player) || ((dataRowSplit[i].split(",")[1].toString().indexOf(player.split(" ")[1])) > 0 && (dataRowSplit[i].split(",")[1].toString().substring(0, 1) == player.split(" ")[0].substring(0, 1)))) {
            return dataRowSplit[i].split(",")[0];
        }
    }
    return "Not Found";
}

//parse =
function parse(html) {
    var document = parse5.parse(html);
    var xhtml = xmlser.serializeToString(document);
    var doc = new dom().parseFromString(xhtml);
    var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
    var lineups = select("//x:div[@class='dlineups-half']", doc);
    var team_Info_Lineup = [];

    for (var i = 0; i < lineups.length; i++) {

        if (select("count(//x:div[@class='dlineups-half'][" + (i + 1) + "]/*)", doc) == 9) {
            //console.log("gets here")
            var lineup = select("//x:div[@class='dlineups-half'][" + (i + 1) + "]/*", doc);
            var lineupArr = [];
            for (var j = 0; j < lineup.length; j++) {
                var position = select("//x:div[@class='dlineups-half'][" + (i + 1) + "]/*[" + (j + 1) + "]/*/text()", doc).toString().split(",")[0];

                var player = select("//x:div[@class='dlineups-half'][" + (i + 1) + "]/*[" + (j + 1) + "]/*/*/text()", doc).toString().split(",")[0];
                var bats = select("//x:div[@class='dlineups-half'][" + (i + 1) + "]/*[" + (j + 1) + "]/*/*/text()", doc).toString().split("(")[1].substring(0, 1);

                var ID = IDlookup(player);
                lineupArr.push({ "player": player, "ID": ID, "position": position, "bats": bats, "batting": (j + 1) });

            }

            if (i % 2 == 0) {
                var team = select("//x:div[@class='dlineups-mainbar-away'][" + (i / 2 + 1) + "]/*[1]/text()", doc).toString();
		var record = select("//x:div[@class='dlineups-mainbar-away'][" + (i / 2 + 1) + "]/*[3]/text()", doc).toString().split(": ")[1];
                
		var pitcher = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[0];
                var pitcherHand = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[1].split("(")[1].substring(0, 1);
                //console.log(select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[0]);
                var pitcherRecord = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[2].split("(")[1].split(",")[0];
                var pitcherEra = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[3].split(")")[0].split(" ")[1];
                var pitcherInfo = { "name": pitcher, "pitcherHand": pitcherHand, "pitcherRecord": pitcherRecord, "pitcherEra": pitcherEra };

                team_Info_Lineup.push({ "name": team, "record": record, "HA": "Away", "pitcher": pitcherInfo, "lineup": lineupArr });
            } else {
                var team = select("//x:div[@class='dlineups-mainbar-home'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/text()", doc).toString();
                var record = select("//x:div[@class='dlineups-mainbar-home'][" + (Math.floor(i / 2 + 1)) + "]/*[4]/text()", doc).toString().split(": ")[1];
                var pitcher = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[0];
		var pitcherHand = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[1].split("(")[1].substring(0, 1);
                var pitcherRecord = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[2].split("(")[1].split(",")[0];
                var pitcherEra = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[3].split(")")[0].split(" ")[1];
		var pitcherInfo = { "name": pitcher, "pitcherHand": pitcherHand, "pitcherRecord": pitcherRecord, "pitcherEra": pitcherEra };            
		team_Info_Lineup.push({ "name": team, "record": record, "HA": "Away", "pitcher": pitcherInfo, "lineup": lineupArr });
            }
        }
        else {
            if (i % 2 == 0) {
                var team = select("//x:div[@class='dlineups-mainbar-away'][" + (i / 2 + 1) + "]/*[1]/text()", doc).toString();
		var pitcher = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[0];
		var pitcherHand = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[1].split("(")[1].substring(0, 1);
		var pitcherRecord = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[2].split("(")[1].split(",")[0];
		var pitcherEra = select("//x:div[@class='span11 dlineups-pitchers'][" + (i / 2 + 1) + "]/*[1]/*/text()", doc).toString().split(",")[3].split(")")[0].split(" ")[1];
		var pitcherInfo = { "name": pitcher, "pitcherHand": pitcherHand, "pitcherRecord": pitcherRecord, "pitcherEra": pitcherEra };


                var record = select("//x:div[@class='dlineups-mainbar-away'][" + (i / 2 + 1) + "]/*[3]/text()", doc).toString().split(": ")[1];
                team_Info_Lineup.push({ "name": team, "record": record, "HA": "Away",  "pitcher": pitcherInfo,"lineup": "Pending" });
            }
            else {
                var team = select("//x:div[@class='dlineups-mainbar-home'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/text()", doc).toString();
                var record = select("//x:div[@class='dlineups-mainbar-home'][" + (Math.floor(i / 2 + 1)) + "]/*[4]/text()", doc).toString().split(": ")[1];
var pitcher = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[0];
		var pitcherHand = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[1].split("(")[1].substring(0, 1);
                var pitcherRecord = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[2].split("(")[1].split(",")[0];
                var pitcherEra = select("//x:div[@class='span11 dlineups-pitchers'][" + (Math.floor(i / 2 + 1)) + "]/*[2]/*/text()", doc).toString().split(",")[3].split(")")[0].split(" ")[1];
		var pitcherInfo = { "name": pitcher, "pitcherHand": pitcherHand, "pitcherRecord": pitcherRecord, "pitcherEra": pitcherEra };       
                team_Info_Lineup.push({ "name": team, "record": record, "HA": "Home", "pitcher": pitcherInfo,"lineup": "Pending" });
            }
        }
    }
    var games = [];
    var gameTimes = select("//x:div[@class='dlineups-topboxcenter']", doc);//*/*[2]/text()",doc);


    for (i = 0; i < gameTimes.length; i++) {
        var time = select("//x:div[@class='dlineups-topboxcenter'][" + (i + 1) + "]/*[1]/*/text()", doc).toString();
	var weather= select("//x:div[@class='dlineups-topboxcenter-bottomline'][" + (i + 1) + "]/text()", doc).toString();

	if(select("count(//x:div[@class='dlineups-topboxcenter-bottomline'][" + (i + 1) + "]/*)", doc)>0)	{
	    var weather=select("//x:div[@class='dlineups-topboxcenter-bottomline'][" + (i + 1) + "]/*[1]/text()", doc).toString();
	}
	
	if(weather.indexOf("\n")!=-1){
		weather = weather.replace(/\n/g, " ");
	}

        var team1 = team_Info_Lineup[2 * (i)];
        var team2 = team_Info_Lineup[2 * (i) + 1];
        games.push({ "time": time, "weather":weather,"away": team1, "home": team2 });

    }
    console.log(JSON.stringify(games));
    var gamesObj={"games":games};
    

    
    	

    var gamesToJSON = JSON.stringify(gamesObj);
    //console.log(gamesToJSON);
    
     fs.writeFile('output.json',gamesToJSON,function(err){
     if(err){return console.error(err); } 
     });
     

    return gamesToJSON;
}


module.exports = {
  parse: parse
}
