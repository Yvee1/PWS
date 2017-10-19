Slider slider;
Button button;

int inByte = 0;

import processing.serial.*;
Serial myPort;

void setup() {
  size(400, 600);
  noStroke(); 
  // Initieer de slider
  slider = new Slider(20, 20, 40, 20);
  button = new Button(200, 260, 100, 80, false);
  
  println("Serial ports: ");
  println(Serial.list());
  
  myPort = new Serial(this, Serial.list()[0], 9600);
  establishContact();
}
 
void draw() {
  
  // if we get a valid byte, read analog ins:
  if (myPort.available() > 0) {
    // get incoming byte:
    inByte = myPort.read();
    //println("Incoming: " + inByte);
    //println("Button: " + byte(button.on));
    int message = int(map(slider.getValue(), 0, 100, 0, 255));
    myPort.write(byte(message));
    myPort.write(byte(button.on));
  
  }
  
  background(100);
  
  // Start de slider
  slider.run();
  button.display();
}
 
 
void mousePressed() {
  // Alleen als de muis over de slider is moet de slider bewegen
  if (slider.isOver()){
    slider.move = true;
  }
  if (button.isOver()){
    button.on = !button.on;
  }
  
}
 
void mouseReleased() {
  slider.move = false;
}

void establishContact() {
  while (myPort.available() <= 0) {
    myPort.write('A');   // send a capital A
    delay(300);
  }
}