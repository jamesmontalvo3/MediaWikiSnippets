// paste the following into your javascript console. Update the following
// variables for your server

var wikiBaseURL = "https://example.com/wiki/";
var wikis = ["wiki1", "wiki2", "wiki3"];


//
// NO CHANGES REQUIRED BELOW
//

var allExtensions = {};
var wikiCompletionStatus = {
    // wiki1: false,
    // wiki2: false,
    // wiki3: false
};

function allWikisComplete () {
    for ( var i in wikiCompletionStatus ) {
        if ( wikiCompletionStatus[i] === false ) {
            return false;
        }
    }
    return true;
}

function printWikiInfo () {
    var output = "Extension\t";

    for( var w in wikis ) {
        output += wikis[w] + "\t";
    }
    output += "\n";

    var extList = [];
    for( var e in allExtensions ) {
        extList.push( e );
    }
    extList.sort();

    for( var i in extList ) {
        e = extList[i];

        output += e + "\t";
        for( var w in wikis ) {
            var extOnWiki = allExtensions[e][ wikis[w] ]
            if ( extOnWiki ) {
                if ( extOnWiki.version ) {
                    output += extOnWiki.version + "\t";
                }
                else if ( extOnWiki.git ) {
                    output += "git: " + extOnWiki.git + "\t";
                }
                else {
                    output += "No version info\t";
                }
            }
            else {
                output += "Not installed\t";
            }
        }
        output += "\n";
    }

    console.log( output );
}


for ( var w in wikis ) {
    var wikiName = wikis[w];
    wikiCompletionStatus[wikiName] = false; // initially not yet complete

    // request extension info from this wiki
    console.log( "requesting " + wikiName + " extensions" );
    $.getJSON(
        wikiBaseURL + wikiName + "/api.php",
        {
            action: "query",
            meta: "siteinfo",
            siprop: "extensions",
            format: "json"
        },
        (function( wiki ){
            return function( response ) {
                console.log( "received " + wiki + " response; processing..." );
                var extensions = response.query.extensions

                for( var i in extensions ) {

                    var e = extensions[i];
                    if ( ! allExtensions[e.name] ) {
                        allExtensions[e.name] = {};
                    }

                    allExtensions[e.name][wiki] = {
                        version: ( e.version ? e.version : "" ),
                        git: ( e["vcs-version"] ? e["vcs-version"].substring( 0, 6 ) : "" )
                    };

                }

                // mark this wiki complete
                console.log( "complete recording " + wiki + " extensions" );
                wikiCompletionStatus[wiki] = true;

                // check if others are complete
                if ( allWikisComplete() ) {
                    printWikiInfo();
                }


            };
        })( wikiName )
    );

}