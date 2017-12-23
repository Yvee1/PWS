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

	$('#voiceButton').click(function(){
		startRecognition()
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

let current;
let previous;

// Handle results
function startRecognition(){
    window.plugins.speechRecognition.startListening(function(result){
        // Show results in the console
        document.getElementById("recognized").innerHTML = result;

        if (result.includes('achteruit')){
            current = 'B';
        }
        else if(result.includes('rechts')){
            current = 'R';
        }
        else if(result.includes('links')){
            current = 'L';
        }
        else if (result.includes('vooruit')){
            current = 'F';
        }
        else if (result.includes('stop')){
            current = '0';
        }
        if (current != previous){
            document.getElementById("message").innerHTML = current;
            app.sendString(current);
            previous = current;
        }
    }, function(err){
        document.getElementById("message").innerHTML = err;
    }, {
        language: "nl-NL",
        showPopup: true
    });
}

// Verify if recognition is available
window.plugins.speechRecognition.isRecognitionAvailable(function(available){
    if(!available){
        console.log("Sorry, not available");
    }

    // Check if has permission to use the microphone
    window.plugins.speechRecognition.hasPermission(function (isGranted){
        if(isGranted){
            startRecognition();
        }else{
            // Request the permission
            window.plugins.speechRecognition.requestPermission(function (){
                // Request accepted, start recognition
                startRecognition();
            }, function (err){
                document.getElementById("message").innerHTML = err;
            });
        }
    }, function(err){
        document.getElementById("message").innerHTML = err;
    });
}, function(err){
    document.getElementById("message").innerHTML = err;
});
