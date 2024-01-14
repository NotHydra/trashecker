#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

#define SOUND_VELOCITY 0.034

const char *wifiSSID = "SSID";
const char *wifiPassword = "PASSWORD";

const String server = "signature-api.irswanda.com";

const int sensorTriggerPin = 12;
const int sensorEchoPin = 14;

long duration;
float distance;

void setup()
{
	Serial.begin(115200);
	delay(1000);

	pinMode(sensorTriggerPin, OUTPUT);
  	pinMode(sensorEchoPin, INPUT);

	WiFi.mode(WIFI_STA);
	WiFi.begin(wifiSSID, wifiPassword);

	logSetup("Connecting To SSID: " + String(wifiSSID));
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(500);
	};

	logSetup("Connected To IP Address: " + String(WiFi.localIP().toString().c_str()));
};

void loop()
{
	digitalWrite(sensorTriggerPin, LOW);
	delayMicroseconds(2);
	digitalWrite(sensorTriggerPin, HIGH);
	delayMicroseconds(10);
	digitalWrite(sensorTriggerPin, LOW);

	duration = pulseIn(sensorEchoPin, HIGH);
	distance = duration * SOUND_VELOCITY / 2;

	// if (WiFi.status() == WL_CONNECTED)
	// {
	// 	WiFiClientSecure client;
	// 	client.setInsecure();

	// 	HTTPClient https;
	// 	const String target = "https://" + server + "/api/user";
	// 	logLoop("Requesting At: " + target);

	// 	if (https.begin(client, target))
	// 	{
	// 		logLoop("Response Code: " + String(https.GET()));

	// 		https.end();
	// 	}
	// 	else
	// 	{
	// 		logLoop("Unable To Connect");
	// 	};
	// };

	if (distance < 10) {
		logLoop("Status: Full");
	} else {
		logLoop("Status: Empty");
	}


	logLoop("Distance: " + String(distance));
	Serial.println();

	delay(1000);
};

void logSetup(String text) {
	Serial.println("[setup] " + text);
};

void logLoop(String text) {
	Serial.println("[loop] " + text);
};