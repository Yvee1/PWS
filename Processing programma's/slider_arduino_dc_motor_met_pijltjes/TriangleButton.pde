class TriangleButton{
  boolean on;
  float x1;
  float y1;
  float x2;
  float y2;
  float x3;
  float y3;

  
  TriangleButton(float _x1, float _y1, float _x2, float _y2, float _x3, float _y3, boolean _on){
    x1 = _x1;
    y1 = _y1;
    x2 = _x2;
    y2 = _y2;
    x3 = _x3;
    y3 = _y3;
    on = _on;
  }
  
  boolean isOver(){
    float denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
    float a = ((y2 - y3)*(mouseX - x3) + (x3 - x2)*(mouseY - y3)) / denominator;
    float b = ((y3 - y1)*(mouseX - x3) + (x1 - x3)*(mouseY - y3)) / denominator;
    float c = 1 - a - b;
    return (0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1);

  }
  
  void display(){
    if (on){
      fill(100, 255, 255);
    }
    else{
      fill(0, 255, 255);
    }
    triangle(x1, y1, x2, y2, x3, y3);
  }
  
}