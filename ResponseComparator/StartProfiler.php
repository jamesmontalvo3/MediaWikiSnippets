<?php

// Copy this file into your mediawiki root. Alternatively use the example one in your
// mediawiki root and configure it to work for you.




$GLOBALS['JamesStartProfiler'] = false;
if ( $_SERVER["REMOTE_USER"] == 'DOMAIN\username' ) {
	$GLOBALS['JamesStartProfiler'] = false;
}

if ( $GLOBALS['JamesStartProfiler'] && $_SERVER["REMOTE_USER"] == 'DOMAIN\username' ) {
	$wgProfiler['class'] = 'Profiler';
} else {
	$wgProfiler['class'] = 'ProfilerStub';
}
