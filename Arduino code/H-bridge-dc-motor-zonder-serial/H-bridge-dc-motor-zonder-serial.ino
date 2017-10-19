int in1Pin = 10;
int in2Pin = 9;
boolean reverse;
 
void setup()
{
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
}
 
void loop()
{
  reverse = false;
  digitalWrite(in1Pin, ! reverse);
  digitalWrite(in2Pin, reverse);
}
