#include <SoftwareSerial.h>

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

  if (on){
    setMotorR(speedR, reverseR);
    setMotorL(speedL, reverseL);
  }
  else{
    setMotorR(0, reverseR);
    setMotorL(0, reverseL);
  }
}

void setMotorR(int speedR, boolean reverse)
{
  analogWrite(enablePin1, speedR);
  digitalWrite(in1Pin1, ! reverse);
  digitalWrite(in2Pin1, reverse);
}
void setMotorL(int speedL, boolean reverseL)
{
  analogWrite(enablePin2, speedL);
  digitalWrite(in3Pin2, ! reverseL);
  digitalWrite(in4Pin2, reverseL);
}
