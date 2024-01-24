const { app } = require('@azure/functions');
var mqtt = require('mqtt');
const fs = require('fs');

// This function is triggered by an HTTP request and publishes a message to an MQTT broker.
app.http('starttask', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    // Read certificate and key from files
    const cert = fs.readFileSync('./cert/user1-id.pem');
    const key = fs.readFileSync('./cert/user1-id.key');

    // MQTT options
    const mqttOptions = {
      clientId: 'fa-mqtt-qstask-demo1', username: 'user1-id',
      key,
      cert,
      rejectUnauthorized: true,
    }

    // Log request details
    const headers = Object.fromEntries(request.headers.entries());
    const url = request.url;
    const body = await request.text();
    context.log('POST body: ' + body);
    context.log('POST headers: ' + JSON.stringify(headers, null, 2));
    context.log('POST url: ' + JSON.stringify(url, null, 2));

    // Connect to MQTT broker
    var client = await mqtt.connectAsync('mqtts://mqttqsdemo1.swedencentral-1.ts.eventgrid.azure.net:8883', mqttOptions);
    context.log("MQTT client connected flag: " + client.connected);

    // Publish message
    await client.publishAsync('qliksense/starttask', body, { qos: 1 });

    // Disconnect from MQTT broker
    await client.endAsync();

    return { body: `Thanks, message received.` };
  }
});
