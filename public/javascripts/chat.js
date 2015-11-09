var socket = io();

// DOM Ready =============================================================
$(document).ready(function() {
    
	$('#messages').scrollTop($('#messages')[0].scrollHeight);
	$('form').submit(function(){
		var message = $('#inputMessage').val()
		console.log ("form submit: "+message)
		socket.emit('chat message', message);
		$('#inputMessage').val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	});
});

