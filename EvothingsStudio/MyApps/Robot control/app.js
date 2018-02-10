$(document).ready(function() {

	$('#connectButton').click(function() {
		app.connect()
	})

	$('#disconnectButton').click(function() {
		app.disconnect()
	})

	$('#arrow-up').on("touchstart", function(){
		$('#arrow-up').css('border-bottom', '70px solid green');
		app.arrowUpOn();
	})

	$('#arrow-left').on("touchstart", function(){
		$('#arrow-left').css('border-right', '70px solid green');
		app.arrowLeftOn()
	})

	$('#arrow-right').on("touchstart", function(){
		$('#arrow-right').css('border-left', '70px solid green');
		app.arrowRightOn()
	})

	$('#arrow-down').on("touchstart", function(){
		$('#arrow-down').css('border-top', '70px solid green');
		app.arrowDownOn()
	})

	$('#arrow-up').on("touchend mouseup", function(){
		$('#arrow-up').css('border-bottom', '70px solid #363636');
		app.arrowUpOff()
	})

	$('#arrow-left').on("touchend mouseup", function(){
		$('#arrow-left').css('border-right', '70px solid #363636');
		app.arrowLeftOff()
	})

	$('#arrow-right').on("touchend mouseup", function(){
		$('#arrow-right').css('border-left', '70px solid #363636');
		app.arrowRightOff()
	})

	$('#arrow-down').on("touchend mouseup", function(){
		$('#arrow-down').css('border-top', '70px solid #363636');
		app.arrowDownOff()
	})

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

app.arrowUpOn = function() {
	app.sendString('F')
}

app.arrowUpOff = function() {
	app.sendString('0')
}

app.arrowLeftOn = function() {
	app.sendString('L')
}

app.arrowLeftOff = function() {
	app.sendString('0')
}

app.arrowRightOn = function() {
	app.sendString('R')
}

app.arrowRightOff = function() {
	app.sendString('0')
}

app.arrowDownOn = function() {
	app.sendString('B')
}

app.arrowDownOff = function() {
	app.sendString('0')
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
