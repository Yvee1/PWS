#include <SoftwareSerial.h>

int enablePin1 = 6;
int in1Pin1 = 9;
int in2Pin1 = 8;

int enablePin2 = 5;
int in4Pin2 = 4;
int in3Pin2 = 7;

int speed = 80;
boolean on = false;
boolean reverse1 = false;
boolean reverse2 = false;

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
      default:   if(isDigit(inByte)){
                   speed = map(inByte - '0', 0, 9, 0, 255);
                 }
                 break;
    }
  }

  if (on){
    setMotor1(speed, reverse1);
    setMotor2(speed, reverse2);
  }
  else{
    setMotor1(0, reverse1);
    setMotor2(0, reverse2);
  }
}

void setMotor1(int speed, boolean reverse)
{
  analogWrite(enablePin1, speed);
  digitalWrite(in1Pin1, ! reverse);
  digitalWrite(in2Pin1, reverse);
}
void setMotor2(int speed2, boolean reverse2)
{
  analogWrite(enablePin2, speed2);
  digitalWrite(in3Pin2, ! reverse2);
  digitalWrite(in4Pin2, reverse2);
}
