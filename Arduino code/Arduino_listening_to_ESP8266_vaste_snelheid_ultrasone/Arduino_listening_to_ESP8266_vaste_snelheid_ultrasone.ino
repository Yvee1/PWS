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

int speed1 = 255;
int speed2 = 160;
boolean on = false;
boolean reverse1 = false;
boolean reverse2 = false;

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
      case 'L' : on = false;
                 break;
      case 'H' : on = true;
                 break;
      case 'N' : reverse1 = false;
                 break;
      case 'Y' : reverse1 = true;
                 break;
      case 'O' : reverse2 = false;
                 break;
      case 'I' : reverse2 = true;
                 break;
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
    setMotor1(speed1, reverse1);
    setMotor2(speed2, reverse2);
  }
  else{
    setMotor1(0, reverse1);
    setMotor2(0, reverse2);
  }
}

void setMotor1(int speed1, boolean reverse)
{
  analogWrite(enablePin1, speed1);
  digitalWrite(in1Pin1, ! reverse);
  digitalWrite(in2Pin1, reverse);
}
void setMotor2(int speed2, boolean reverse2)
{
  analogWrite(enablePin2, speed2);
  digitalWrite(in3Pin2, ! reverse2);
  digitalWrite(in4Pin2, reverse2);
}
