<?php

// add this somewhere in LocalSettings.php

if ( $_SERVER["REMOTE_USER"] == 'NDC\ejmontal' ) {
	// get debug info via javascript with:
	// JSON.parse( $("#egWiretapDebugInfo").text() );
	$wgDebugToolbar = true;
	$wgHooks['BeforePageDisplay'][] = function( &$out ){

		$out->addElement(
			"script",
			array(
				"type" => "text/template",
				"id" => "egWiretapDebugInfo",
			),
			json_encode( MWDebug::getDebugInfo( $out ) )
		);

	};

}


if ( isset( $GLOBALS['JamesStartProfiler'] ) && $GLOBALS['JamesStartProfiler'] ) {

	// Only record profiling info for pages that took longer than this
	$wgProfileLimit = 0.0;
	// Don't put non-profiling info into log file
	$wgProfileOnly = false;
	// Log sums from profiling into "profiling" table in db
	$wgProfileToDatabase = false;
	// If true, print a raw call tree instead of per-function report
	$wgProfileCallTree = false;
	// Should application server host be put into profiling table
	$wgProfilePerHost = false;

	// Settings for UDP profiler
	$wgUDPProfilerHost = '127.0.0.1';
	$wgUDPProfilerPort = '3811';

	// Detects non-matching wfProfileIn/wfProfileOut calls
	$wgDebugProfiling = false;
	// Output debug message on every wfProfileIn/wfProfileOut
	$wgDebugFunctionEntry = 0;
	// Lots of debugging output from SquidUpdate.php
	$wgDebugSquid = false;

}