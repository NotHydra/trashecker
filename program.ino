#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char *WIFI_SSID = "SSID";
const char *WIFI_PASSWORD = "PASSWORD";
const String SERVER = "signature-api.irswanda.com";

void setup()
{
	Serial.begin(115200);
	delay(500);

	WiFi.mode(WIFI_STA);
	WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

	Serial.print("Connecting To SSID: " + String(WIFI_SSID));
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(500);
		Serial.print(".");
	}

	Serial.println("");
	Serial.print("Connected To IP Addrerss: ");
	Serial.println(WiFi.localIP());
}

void loop()
{
	if (WiFi.status() == WL_CONNECTED)
	{
		WiFiClientSecure client;
		client.setInsecure();

		HTTPClient https;
		String target = "https://" + SERVER + "/api/user";
		Serial.println("Requesting " + target);

		if (https.begin(client, target))
		{
			int httpCode = https.GET();
			Serial.println("============== Response code: " + String(httpCode));

			if (httpCode > 0)
			{
				Serial.println(https.getString());
			}

			https.end();
		}
		else
		{
			Serial.printf("[HTTPS] Unable to connect\n");
		}
	}

	delay(5000);
}
