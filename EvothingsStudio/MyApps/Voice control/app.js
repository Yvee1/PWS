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

function startRecognition(){
    window.plugins.speechRecognition.startListening(function(result){
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

window.plugins.speechRecognition.isRecognitionAvailable(function(available){
    if(!available){
        console.log("Sorry, not available");
    }

    window.plugins.speechRecognition.hasPermission(function (isGranted){
        if(isGranted){
            startRecognition();
        }else{
            window.plugins.speechRecognition.requestPermission(function (){
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
