/*
Adafruit Arduino - Lesson 15. Bi-directional Motor
*/
 
int enablePin = 5;
int in1Pin = 10;
int in2Pin = 9;
int switchPin = 7;
int potPin = 0;
int speed = 0;
boolean reverse;

int serialInArray[2];
int serialCount = 0;
boolean firstContact = false;

void setup()
{
  Serial.begin(9600);
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  pinMode(enablePin, OUTPUT);
  pinMode(switchPin, INPUT_PULLUP);

  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  
}
 
void loop()
{
  //int speed = analogRead(potPin) / 4;
  setMotor(speed, reverse);
}

void serialEvent() {
  while (Serial.available()>0) {
    // read a byte from the serial port:
    int inByte = Serial.read();
    
//    Serial.print("Received: ");
//    Serial.println(inByte);
    // if this is the first byte received, and it's an A,
    // clear the serial buffer and note that you've
    // had first contact from the microcontroller.
    // Otherwise, add the incoming byte to the array:
    if (firstContact == false) {
      if (inByte == 'A') {
        //clear the serial port buffer
        firstContact = true;     // you've had first contact from the microcontroller
        Serial.write('A');       // ask for more
      }
    }
    else {
      // Add the latest byte from the serial port to array:
//      Serial.write(inByte);
      serialInArray[serialCount] = inByte;
//      Serial.print("serialInArray: ");
//      Serial.write(serialInArray[0]);
//      Serial.write(serialInArray[1]);
//      Serial.println(serialCount);
      serialCount++;
      
  
      // If we have 2 bytes:
      if (serialCount > 1 ) {
        
        speed = serialInArray[0];
        Serial.write(serialInArray[1]);
        if (serialInArray[1] == 1){
          reverse = true;
        }
        else{
          reverse = false;
        }
  
        // print the values (for debugging purposes only):
//        if (reverse){
//          Serial.println("true");
//        }
//        else{
//          Serial.println("true");
//        }
  
        // Send a capital A to request new sensor readings:
        Serial.write('A');
        // Reset serialCount:
        serialCount = 0;
    }
   }
  }
}

void setMotor(int speed, boolean reverse)
{
  analogWrite(enablePin, speed);
  digitalWrite(in1Pin, ! reverse);
  digitalWrite(in2Pin, reverse);
}
