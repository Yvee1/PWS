$(document).ready(function() {

	$('#connectButton').click(function() {
		app.connect()
	})

	$('#disconnectButton').click(function() {
		app.disconnect()
	})

	$('#led').click(function(){
		app.ledOn()
	})

	$('#reverse1').click(function(){
		app.reverse1On()
	})

	$('#reverse2').click(function(){
		app.reverse2On()
	})

	$('myRange')
})

var app = {}

app.PORT = 1337
app.socketId

app.connect = function() {

	var IPAddress = $('#IPAddress').val()

	console.log('Trying to connect to ' + IPAddress)

	$('#startView').hide()
	$('#connectingStatus').text('Connecting to ' + IPAddress)
	$('#connectingView').show()

	chrome.sockets.tcp.create(function(createInfo) {

		app.socketId = createInfo.socketId

		chrome.sockets.tcp.connect(
			app.socketId,
			IPAddress,
			app.PORT,
			connectedCallback)
	})

	function connectedCallback(result) {

		if (result === 0) {

			 console.log('Connected to ' + IPAddress)

			 $('#connectingView').hide()
			 $('#controlView').show()

		}
		else {

			var errorMessage = 'Failed to connect to ' + app.IPAdress
			console.log(errorMessage)
			navigator.notification.alert(errorMessage, function() {})
			$('#connectingView').hide()
			$('#startView').show()
		}
	}
}

app.sendString = function(sendString) {

	console.log('Trying to send:' + sendString)

	chrome.sockets.tcp.send (
		app.socketId,
		app.stringToBuffer(sendString),
		function(sendInfo) {

			if (sendInfo.resultCode < 0) {

				var errorMessage = 'Failed to send data'

				console.log(errorMessage)
				navigator.notification.alert(errorMessage, function() {})
			}
		}
	)
}

app.ledOn = function() {

	app.sendString('H')
	$('#led').removeClass('ledOff').addClass('ledOn')

	$('#led').unbind('click').click(function(){
		app.ledOff()
	})
}

app.ledOff = function() {

	app.sendString('L')

	$('#led').removeClass('ledOn').addClass('ledOff')

	$('#led').unbind('click').click(function(){
		app.ledOn()
	})
}

app.reverse1On = function() {

	app.sendString('Y')

	$('#reverse1').removeClass('ledOff').addClass('ledOn')

	$('#reverse1').unbind('click').click(function(){
		app.reverse1Off()
	})
}

app.reverse1Off = function() {

	app.sendString('N')

	$('#reverse1').removeClass('ledOn').addClass('ledOff')

	$('#reverse1').unbind('click').click(function(){
		app.reverse1On()
	})
}

app.reverse2On = function() {

	app.sendString('I')

	$('#reverse2').removeClass('ledOff').addClass('ledOn')

	$('#reverse2').unbind('click').click(function(){
		app.reverse2Off()
	})
}

app.reverse2Off = function() {

	app.sendString('O')

	$('#reverse2').removeClass('ledOn').addClass('ledOff')

	$('#reverse2').unbind('click').click(function(){
		app.reverse2On()
	})
}

app.disconnect = function() {

	chrome.sockets.tcp.close(app.socketId, function() {
		console.log('TCP Socket close finished.')
	})

	$('#controlView').hide()
	$('#startView').show()
}

// Helper functions.

app.stringToBuffer = function(string) {

	var buffer = new ArrayBuffer(string.length)
	var bufferView = new Uint8Array(buffer)

	for (var i = 0; i < string.length; ++i) {

		bufferView[i] = string.charCodeAt(i)
	}

	return buffer
}

app.bufferToString = function(buffer) {

	return String.fromCharCode.apply(null, new Uint8Array(buffer))
}

app.changeSlider = function(value) {
	app.sendString(value);
}
