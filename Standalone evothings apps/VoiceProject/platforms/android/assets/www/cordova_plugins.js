cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-chrome-apps-common.events",
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "pluginId": "cordova-plugin-chrome-apps-common",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.errors",
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.stubs",
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.helpers",
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-tcp.sockets.tcp",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcp/sockets.tcp.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcp",
        "clobbers": [
            "chrome.sockets.tcp"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-tcpserver.sockets.tcpServer",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcpserver/sockets.tcpServer.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcpserver",
        "clobbers": [
            "chrome.sockets.tcpServer"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-udp.sockets.udp",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-udp/sockets.udp.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-udp",
        "clobbers": [
            "chrome.sockets.udp"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-system-network.system.network",
        "file": "plugins/cordova-plugin-chrome-apps-system-network/system.network.js",
        "pluginId": "cordova-plugin-chrome-apps-system-network",
        "clobbers": [
            "chrome.system.network"
        ]
    },
    {
        "id": "cordova-plugin-speechrecognition.SpeechRecognition",
        "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
        "pluginId": "cordova-plugin-speechrecognition",
        "merges": [
            "window.plugins.speechRecognition"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-sockets-tcp": "1.3.7",
    "cordova-plugin-chrome-apps-sockets-tcpserver": "1.2.4",
    "cordova-plugin-chrome-apps-sockets-udp": "1.3.0",
    "cordova-plugin-chrome-apps-system-network": "1.1.2",
    "cordova-plugin-speechrecognition": "1.1.2"
};
// BOTTOM OF METADATA
});