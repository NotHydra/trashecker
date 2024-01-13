const int sensorTriggerPin = 9;
const int sensorEchoPin = 10;

const int ledGreenPin = 11;
const int ledRedPin = 6;

float duration, distance;  

void setup()
{
	pinMode(sensorTriggerPin, OUTPUT);  
	pinMode(sensorEchoPin, INPUT);  
	Serial.begin(9600);  

}

void loop()
{
	digitalWrite(sensorTriggerPin, LOW);  
	delayMicroseconds(2);  
	digitalWrite(sensorTriggerPin, HIGH);  
	delayMicroseconds(10);  
	digitalWrite(sensorTriggerPin, LOW);  

	duration = pulseIn(sensorEchoPin, HIGH); 
	distance = (duration*0.0343)/2;  

	if (distance < 10) {
		analogWrite(ledGreenPin, LOW);
		analogWrite(ledRedPin, HIGH);
	} else {
		analogWrite(ledGreenPin, HIGH);
		analogWrite(ledRedPin, LOW);
	};

	delay(100);
}
