#include <ESP8266WiFi.h>

const char* ssid = "devolo-f4068dc9b561";
const char* password = "HLPFQCOZUGLJXQAV";
const int ledPin = 2;
WiFiServer server(1337);

void printWiFiStatus();

void setup(void) {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  // Configure GPIO2 as OUTPUT.
  pinMode(ledPin, OUTPUT);

  // Start TCP server.
  server.begin();
}

void loop(void) {
  // Check if module is still connected to WiFi.
  if (WiFi.status() != WL_CONNECTED) {
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
    }
    // Print the new IP to Serial.
    printWiFiStatus();
  }

  WiFiClient client = server.available();

  if (client) {
    Serial.println("Client connected.");

    while (client.connected()) {
      if (client.available()) {
        char command = client.read();
        if (command == 'H') {
          digitalWrite(ledPin, 200);
          Serial.println("LED is now on.");
        }
        else if (command == 'L') {
          digitalWrite(ledPin, 0);
          Serial.println("LED is now off.");
        }
      }
    }
    Serial.println("Client disconnected.");
    client.stop();
  }
}

void printWiFiStatus() {
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}
