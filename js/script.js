$(document).ready(function($){
	$('h1, h4, h5, h6').anchorlinker();
	$('h2, h3').anchorlinker({
		autoHide: true,
		before: function(){ alert("before"); },
		after: function(){ alert("after"); }
	});
});