#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

#define SOUND_VELOCITY 0.034

const char *wifiSSID = "Mayoriz_4G";
const char *wifiPassword = "1rsw4nd4";

const String server = "https://trashecker.irswanda.com";

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
	if (WiFi.status() == WL_CONNECTED)
	{
		WiFiClientSecure client;
		client.setInsecure();

		HTTPClient https;
		const String target = server + "/trash-bin/full";

		logLoop("Requesting At: " + target);
		https.begin(client, target);
		https.addHeader("Content-Type", "application/json");
		
		digitalWrite(sensorTriggerPin, LOW);
		delayMicroseconds(2);
		digitalWrite(sensorTriggerPin, HIGH);
		delayMicroseconds(10);
		digitalWrite(sensorTriggerPin, LOW);

		distance = (pulseIn(sensorEchoPin, HIGH) * SOUND_VELOCITY) / 2;

		int httpResponseCode = https.PUT("{\"full\": " + String((distance < 10) ? "true" : "false") + "}");

		logLoop("Response Code: " + String(httpResponseCode));
		if (httpResponseCode > 0)
		{
			logLoop("Result: " + https.getString());
		}
		else
		{
			logLoop("Failed To Make A Request");
		};

		https.end();
	};

	Serial.println();
	delay(1000);
};

void logSetup(String text) {
	Serial.println("[setup] " + text);
};

void logLoop(String text) {
	Serial.println("[loop] " + text);
};