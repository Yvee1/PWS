#include <NewPing.h>
#include <SoftwareSerial.h>

#define TRIGGER_PIN  12  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     11  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.

long previousMillis = 0;
long interval = 200;

int enablePin1 = 6;
int in1Pin1 = 9;
int in2Pin1 = 8;

int enablePin2 = 5;
int in4Pin2 = 4;
int in3Pin2 = 7;

int speedR = 255;
int speedL = 255;
boolean on = false;
boolean reverseR = false;
boolean reverseL = false;

int distance = 0;

SoftwareSerial ESPserial(2, 3); // RX | TX

void setup()
{
  
  Serial.begin(115200);
  pinMode(in1Pin1, OUTPUT);
  pinMode(in2Pin1, OUTPUT);
  pinMode(enablePin1, OUTPUT);
  pinMode(in4Pin2, OUTPUT);
  pinMode(in3Pin2, OUTPUT);
  pinMode(enablePin2, OUTPUT);

  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }

  ESPserial.begin(115200);
}
 
void loop()
{
  if(ESPserial.available()){
    // read a byte from the serial port:
    
    int inByte = ESPserial.read();
    Serial.print("Received: ");
    Serial.write(inByte);
    Serial.println();
    switch (inByte){
      case 'F' : on = true;
                 reverseR = false;
                 reverseL = false;
                 break;
      case 'R' : on = true;
                 reverseR = true;
                 reverseL = false;
                 break;
      case 'L' : on = true;
                 reverseL = true;
                 reverseR = false;
                 break;
      case 'B' : on = true;
                 reverseR = true;
                 reverseL = true;
                 break;
      case '0' : on = false;
                 reverseR = false;
                 reverseL = false;
      default:   break;
    }
  }

  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;   
    distance = sonar.convert_cm(sonar.ping_median(5));
    Serial.println(distance);
  }
 
  if (on && distance > 10){
    setMotorR(speedR, reverseR);
    setMotorL(speedL, reverseL);
  }
  else{
    setMotorR(0, reverseR);
    setMotorL(0, reverseL);
  }
}

void setMotorR(int speedR, boolean reverseR)
{
  analogWrite(enablePin1, speedR);
  digitalWrite(in1Pin1, ! reverseR);
  digitalWrite(in2Pin1, reverseR);
}
void setMotorL(int speedL, boolean reverseL)
{
  analogWrite(enablePin2, speedL);
  digitalWrite(in3Pin2, ! reverseL);
  digitalWrite(in4Pin2, reverseL);
}
