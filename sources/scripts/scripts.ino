#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

#define SOUND_VELOCITY 0.034

const char *wifiSSID = "Mayoriz_4G";
const char *wifiPassword = "1rsw4nd4";

const String server = "https://trashecker-api.irswanda.com";
const int trashBinId = 1;
const String url = server + "/api/trash-bin/" + String(trashBinId);

const int sensorTriggerPin = 12;
const int sensorEchoPin = 14;

const int updateDelay = 5000;

float maxCapacity;

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

	calibrate();
};

void loop()
{
	if (WiFi.status() == WL_CONNECTED)
	{
		update();
	};

	Serial.println();
	delay(updateDelay);
};

void logSetup(String text) {
	Serial.println("[setup] " + text);
};

void logLoop(String text) {
	Serial.println("[loop] " + text);
};

void activateSensor() {
	digitalWrite(sensorTriggerPin, LOW);
	delayMicroseconds(2);
	digitalWrite(sensorTriggerPin, HIGH);
	delayMicroseconds(10);
	digitalWrite(sensorTriggerPin, LOW);
};

float getSensorLength() {
	return (pulseIn(sensorEchoPin, HIGH) * SOUND_VELOCITY / 2);
};

void calibrate() {
	WiFiClientSecure client;
	client.setInsecure();

	HTTPClient request;

	logSetup("Calibrating At: " + url);
	request.begin(client, url);
	request.addHeader("Content-Type", "application/json");

	activateSensor();

	maxCapacity = getSensorLength();

	const int responseCode = request.PUT("{\"maxCapacity\": " + String(maxCapacity) + ", \"currentCapacity\": 0}");

	logSetup("Calibrating Response: " + String(responseCode));
	if (responseCode > 0)
	{
		logSetup("Calibrating Result: " + request.getString());
	}
	else
	{
		logSetup("Failed To Calibrate");
	};

	request.end();
}

void update() {
	WiFiClientSecure client;
	client.setInsecure();

	HTTPClient request;

	logLoop("Updating At: " + url);
	request.begin(client, url);
	request.addHeader("Content-Type", "application/json");
	
	activateSensor();

	const int responseCode = request.PUT("{\"currentCapacity\": " + String(getSensorLength()) + "}");

	logLoop("Updating Response: " + String(responseCode));
	if (responseCode > 0)
	{
		logLoop("Updating Result: " + request.getString());
	}
	else
	{
		logLoop("Failed To Update");
	};

	request.end();
}