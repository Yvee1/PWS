Slider slider;
Button button;

int inByte = 0;

import processing.serial.*;
Serial myPort;

void setup() {
  size(400, 600);
  noStroke(); 
  // Initieer de slider en knop
  slider = new Slider(20, 20, 40, 20);
  button = new Button(200, 260, 100, 80, false);
  
  // Om de port van Arduino te vinden als het niet standaard de eerste is in de lijst
  //println("Serial ports: ");
  //println(Serial.list());
  
  // Declareer en initieer de serial port, kies de eerste uit de lijst met baud rate 9600
  myPort = new Serial(this, Serial.list()[0], 9600);
  // Maak contact met Arduino (stuur een A en wacht op een reactie)
  establishContact();
}
 
void draw() {
  
  // Als er een byte binnenkomt
  if (myPort.available() > 0) {
    inByte = myPort.read(); //sla de byte op
    
    //voor testen
    //println("Incoming: " + inByte);
    //println("Button: " + byte(button.on));
    
    // Pak de waarde van de slider en maak het een waarde tussen 0 en 255 (nodig voor motor)
    int message = int(map(slider.getValue(), 0, 100, 0, 255));
    
    // Stuur beiden berichten als bytes
    myPort.write(byte(message));
    myPort.write(byte(button.on));
  
  //}
  
  background(100);
  
  // Start de slider
  slider.run();
  button.display();
}
 
// Als muis ingedrukt is
void mousePressed() {
  // Als de muis over de slider is moet de slider bewegen
  if (slider.isOver()){
    slider.move = true;
  }
  // Als de muis over de knop hangt, verander de waarde van de knop
  if (button.isOver()){
    button.on = !button.on;
  }
  
}

// Als muis niet is ingedrukt
void mouseReleased() {
  // Beweeg de slider niet naar de Y waarde van muis
  slider.move = false;
}

void establishContact() {
  // Als er geen byte is ontvangen
  while (myPort.available() <= 0) {
    // Stuur elke 300 miliseconden een A
    myPort.write('A');
    delay(300);
  }
}