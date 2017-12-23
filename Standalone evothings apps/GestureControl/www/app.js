//
// Copyright 2015, Evothings AB
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
$(document).ready(function() {
    $('#connectButton').click(function() {
        app.connect()
    })

    $('#disconnectButton').click(function() {
        app.disconnect()
    })

	$('#arrow-down').on("touchstart", function(){
		$('#arrow-down').css('border-top', '170px solid green');
		app.arrowDownOn()
	})

	$('#arrow-down').on("touchend mouseup", function(){
		$('#arrow-down').css('border-top', '170px solid #363636');
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
			initialiseAccelerometer()
            screen.orientation.lock('landscape');

        } else {

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

    chrome.sockets.tcp.send(
        app.socketId,
        app.stringToBuffer(sendString),
        function(sendInfo) {

            if (sendInfo.resultCode < 0) {

                var errorMessage = 'Failed to send data'

                console.log(errorMessage)
                //navigator.notification.alert(errorMessage, function() {})
            }
        }
    )
}

let down = false;

app.arrowDownOn = function() {
	down = true;
}

app.arrowDownOff = function() {
	down = false;
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


function initialiseAccelerometer()
{
	function onSuccess(acceleration)
	{
		accelerometerHandler(acceleration.x, acceleration.y, acceleration.z)
	}

	function onError(error)
	{
		console.log('Accelerometer error: ' + error)
	}

	navigator.accelerometer.watchAcceleration(
		onSuccess,
		onError,
		{ frequency: 50 })
}

let previous;
let current;

function accelerometerHandler(accX, accY, accZ) {
    // console.log("AccX: " + accX);
	// console.log("AccY: " + accY);
	// console.log("AccZ: " + accY);

	if (down){
		current = 'B';
	}
	else if(accY < -3){
		current = 'R';
	}
	else if(accY > 3){
		current = 'L';
	}
	else if (accX > -7){
		current = 'F';
	}
	else{
		current = '0';
	}
	if (current != previous){
		app.sendString(current);
		previous = current;
	}
}

// document.addEventListener(
// 	'deviceready',
// 	function() { evothings.scriptsLoaded(initialiseAccelerometer) },
// 	false);
