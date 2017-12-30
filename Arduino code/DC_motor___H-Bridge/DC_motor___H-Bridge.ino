int enablePin = 11;
int in1Pin = 10;
int in2Pin = 9;
int switchPin = 7;
int potPin = 0;
int speed = 0;
boolean reverse;

// Declareer een array van integers met 2 plekken
int serialInArray[2];
// Declareer een integer om
int serialCount = 0;

boolean firstContact = false;

void setup()
{
  // Start Serial op 9600 baud
  Serial.begin(9600);

  // Pins instellen
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  pinMode(enablePin, OUTPUT);
  pinMode(switchPin, INPUT_PULLUP);

  while (!Serial) {
    ; // Wacht totdat er Serial communicatie werkt bij Arduino
  }
  
}
 
void loop()
{
  setMotor(speed, reverse);
}

void serialEvent() {
  // Wanneer er een byte 'in de wachtrij staat'
  while (Serial.available()>0) {
    // Sla de byte op in de variabele inByte
    int inByte = Serial.read();
    
    // Voor testen
    //Serial.print("Received: ");
    //Serial.println(inByte);
    
    // Als er nog geen contact is gemaakt
    if (firstContact == false) {
      // Kijk of het bericht een A is
      if (inByte == 'A') {
        firstContact = true;
        // Vraag gegevens door iets terug te sturen
        Serial.write('A');
      }
    }

    // Als er al wel contact was gemaakt
    else {
      // Zet de byte op de goede plaats in de array
      serialInArray[serialCount] = inByte;
      // Zet de counter voor de plaats van de byte 1 omhoog
      serialCount++;
      
  
      // Als we 2 bytes hebben ontvangen en opgeslagen hebben
      if (serialCount > 1 ) {
        
        // Zet de snelheid gelijk aan de eerste waarde van de array
        speed = serialInArray[0];
        
        // Als de waarde een 1 is, zet de motor in de achteruit
        if (serialInArray[1] == 1){
          reverse = true;
        }

        // Anders niet
        else{
          reverse = false;
        }
  
        // Stuur A om voor meer gegevens te vragen
        Serial.write('A');
        
        // Zet de counter weer op 0
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
