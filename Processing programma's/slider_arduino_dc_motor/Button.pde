class Button{
  boolean on;
  float x;
  float y;
  float w;
  float h;
  
  Button(float _x, float _y, float _w, float _h, boolean _on){
    x = _x;
    y = _y;
    w = _w;
    h = _h;
    on = _on;
  }
  
  boolean isOver(){
    return (x+w >= mouseX) && (mouseX >= x) && (y+h >= mouseY) && (mouseY >= y);
  }
  
  void display(){
    if (on){
      fill(0, 255, 0);
    }
    else{
      fill(255, 0, 0);
    }
    rect(x, y, w, h);
  }
  
}