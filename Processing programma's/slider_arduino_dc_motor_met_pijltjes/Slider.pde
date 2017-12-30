class Slider {
  //class vars
  float x;
  float y;
  float w, h;
  float initialY;
  boolean move = false;
  float lowerY;
 
  Slider (float _x, float _y, float _w, float _h) {
 
    x=_x;
    y=_y;
    initialY = y;
    w=_w;
    h=_h;
  }
 
 
  void run() {
    lowerY = height - h - initialY;
    
    // Bereken kleur op basis van stand van slider
    float grayScaleColor = map(y, initialY, lowerY, 255, 120);
    
    // Stel de kleur in
    fill(grayScaleColor);
 
    // Teken de slider lijn
    rect(x, initialY, 4, lowerY);
    
    // Bereken procentuele waarde
    float value = map(y, initialY, lowerY, 100, 0);
 
    // Teken label
    fill(200);
    rect(x, y, w, h);
 
    // display text
    fill(0);
    text(int(value) +"%", x+5, y+15);
 
    // Krijg de Y waarde van de muis en beperk het tot de grootte van de slider
    float my = constrain(mouseY, initialY, height - h - initialY );
    
    // Zet y waarde (van label) gelijk aan de Y waarde van muis
    if (move) y = my;
  }
  
  // Geeft waarde van slider
  float getValue(){
    return map(y, initialY, lowerY, 100, 0);
  }
  
  // Stuurt terug of de muis over de slider is
  boolean isOver()
  {
    return (x+w >= mouseX) && (mouseX >= x) && (y+h >= mouseY) && (mouseY >= y);
  }
}