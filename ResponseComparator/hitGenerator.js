// The contents of this file are pasted into your browser's javascript console
// for each server you want to run the test on. When you're done you can do:
//     console.log( tabularData );
// to get the data from each server. Paste this into a spreadsheet, make a chart
// and start guessing where the problem is. There are several things commented
// out below which you may want to play with.

var latestResponse;
var tabularData = "";
var URL = "index.php?title=Special%3ARandom"
var period = 10000;
var testDatabase = false;

function getRandomPage ( period ) {

	if ( period ) {
		window.period = period;
	}

	window.requestStart = (new Date).getTime();

	if ( window.stopHitGenerator ) {
		console.log( "stopHitGenerator set to true; Stopping execution. Restart with getRandomPage(period_in_milliseconds)");
		return;
	} else {
		console.log( "Sending request. Period set to " + window.period + "ms. Stop by setting stopHitGenerator=true;" );
	}

	$.get(
		// "https://fod2.jsc.nasa.gov/wiki/fod", ///index.php?title=Special%3ARandom", //&emw_debug=true
		URL,
		{},
		function ( response ) {
			latestResponse = response;

			// get values
			var d = new Date();
			var timestamp = d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
			// var title = $( response ).find( ".firstHeading span" ).text();
			// var queryTime = 0;
			// var numQueries = $( response )
			// 	.find( "#mw-debug-querylist .stats" )
			// 	.each( function( i, e ) {
			// 		queryTime += parseFloat( $( e ).text() );
			// 	})
			// 	.size();

			var responseTime = d.getTime() - window.requestStart;
			window.requestStart = 0;

			if ( testDatabase ) {
				var debugJSON = JSON.parse( $( response ).find("#egWiretapDebugInfo").text() );
				var databaseTime = 0;
				for( var i=0; i<debugJSON.queries.length; i++ ) {
					// console.log( debugJSON.queries[i].time );
					databaseTime += debugJSON.queries[i].time;
				}
				databaseTime = parseInt( databaseTime * 1000 );
				countQueries = i + 1;

				tabularData += timestamp + "\t" + responseTime + "\t" + databaseTime + "\t" + countQueries + "\n";
				console.log( responseTime + ": " + databaseTime + " / " + countQueries );

			} else {
				tabularData += timestamp + "\t" + responseTime + "\n";
				console.log( responseTime );
			}

		}
	);

	setTimeout( getRandomPage, window.period );

}

getRandomPage( 18000 );
