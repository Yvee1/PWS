Slider slider;
Button button;
TriangleButton upArrow;
TriangleButton leftArrow;
TriangleButton rightArrow;

int inByte = 0;

import processing.serial.*;

void setup() {
  colorMode(HSB);
  size(500, 600);
  noStroke(); 
  // Initieer de objecten
  slider = new Slider(20, 20, 40, 20);
  button = new Button(185, 260, 120, 120, false);
  upArrow = new TriangleButton(172, 239, 322, 239, 247, 150, false);
  leftArrow = new TriangleButton(166, 250, 166, 400, 77, 325, false);
  rightArrow = new TriangleButton(325, 250, 325, 400, 400, 325, false);
  
}
 
void draw() {
  background(100);
  
  // Start de slider
  slider.run();
  // Witte omlijning rond de knoppen
  stroke(255);
  // Laat de knoppen zien
  button.display();
  upArrow.display();
  leftArrow.display();
  rightArrow.display();
}
 
 
void mousePressed() {
  // Alleen als de muis over de slider is moet de slider bewegen
  if (slider.isOver()){
    slider.move = true;
  }
  // Als op een knop wordt gedrukt, voer de bijbehorende functie uit
  if (button.isOver()){
    resetPressed();
  }
  if (upArrow.isOver()){
    upPressed();
  }
  if (leftArrow.isOver()){
    leftPressed();
  }
  if (rightArrow.isOver()){
    rightPressed();
  }
}
 
void mouseReleased() {
  slider.move = false;
}

// Knoppen ook met toetsenbord te besturen
void keyPressed(){
  if (key == CODED) {
    if (keyCode == UP) {
      upPressed();}
    if (keyCode == LEFT) {
      leftPressed();}
    if (keyCode == RIGHT) {
      rightPressed();
    }
  }
  if (key == ' ') {
    resetPressed();
  }
}

// Functies zorgen ervoor dat er niet meer dan 1 knop aanstaat
void upPressed(){
  upArrow.on = true;
  leftArrow.on = false;
  rightArrow.on = false;
}

void leftPressed(){
  leftArrow.on = true;
  upArrow.on = false;
  rightArrow.on = false;
}

void rightPressed(){
  rightArrow.on = true;
  upArrow.on = false;
  leftArrow.on = false;
}

void resetPressed(){
  upArrow.on = false;
  leftArrow.on = false;
  rightArrow.on = false;
}