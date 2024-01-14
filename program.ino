#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char *wifiSSID = "SSID";
const char *wifiPassword = "PASSWORD";
const String server = "signature-api.irswanda.com";

void setup()
{
	Serial.begin(115200);
	delay(1000);

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
		const String target = "https://" + server + "/api/user";
		logLoop("Requesting At: " + target);

		if (https.begin(client, target))
		{
			logLoop("Response Code: " + String(https.GET()));

			https.end();
		}
		else
		{
			logLoop("Unable To Connect");
		};
	};

	delay(5000);
};

void logSetup(String text) {
	Serial.println("[setup] " + text);
};

void logLoop(String text) {
	Serial.println("[loop] " + text);
};