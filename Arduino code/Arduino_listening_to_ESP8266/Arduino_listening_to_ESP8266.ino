#include <SoftwareSerial.h>

int enablePin = 11;
int in1Pin = 10;
int in2Pin = 9;
int speed = 80;
boolean on = false;
boolean reverse = false;

SoftwareSerial ESPserial(2, 3); // RX | TX

void setup()
{
  Serial.begin(115200);
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  pinMode(enablePin, OUTPUT);

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
      case 'N' : reverse = false;
                 break;
      case 'Y' : reverse = true;
                 break;
      default:   if(isDigit(inByte)){
                   speed = map(inByte - '0', 0, 9, 0, 255);
                   Serial.println("The speed is now: " + speed);
                 }
                 break;
    }
  }

  if (on){
    setMotor(speed, reverse);
  }
  else{
    setMotor(0, reverse);
  }
}

void setMotor(int speed, boolean reverse)
{
  analogWrite(enablePin, speed);
  digitalWrite(in1Pin, ! reverse);
  digitalWrite(in2Pin, reverse);
}
