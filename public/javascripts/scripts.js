//Quickly turn console logging on/off
var showLog = false;
function logger (consoleString){
	if (showLog){ console.log(consoleString) };
};



$(document).ready( function() {
	//Dropdown navigation
	$( "#menu img" ).click(function() {
		$( "#menu #dropdown" ).slideToggle("drop");
		$('#menu #dropdown').scrollTo( 0 , 100 );
	});
	$( "#container" ).click(function() {$('#menu #dropdown').hide();});

});