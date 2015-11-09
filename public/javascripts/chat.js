var socket = io();

// DOM Ready =============================================================
$(document).ready(function() {
    
	$('form').submit(function(){
		var message = $('#inputMessage').val()
		console.log ("form submit: "+message)
		socket.emit('chat message', message);
		$('#inputMessage').val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
});

