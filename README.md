# demo-start-sense-reload-via-webhook-mqtt

Sample code showing how Azure Event Grid and Function Apps can be used to  
securely start Qlik Sense reload tasks from anywhere, including from public Internet.

The sample code is used in the following blog post:

https://qliksite.io/qlik-sense-reload-via-webhook-mqtt/

    NOTE:
    The sample code in this repository is provided as-is.  
    
    All credentials and certificates used in the sample code have been 
    removed from the files in this repository, meaning that you need 
    to follow the instructions in the blog post to create your own 
    certificates etc.
     
    The information in this repository will however be useful when 
    following along with the blog post.

The repository contains the following directories:

## local-fa-mqtt-qstask

This directory contains a sample Azure Function App with the following functionality:

- Triggered by POST calls to a specific URL
  - The URL can be secured/locked down by Azure's regular IP pre-approval feature/firewall.
- Take the payload from the POST call and forward it as an MQTT message.
- The MQTT message is sent the MQTT topic `qliksense/starttask` in an Azure Event Grid MQTT broker.
- The Function App uses certfificates to authenticate against the MQTT broker.

### Room for improvement

Ideas:

- Store the MQTT broker URL, MQTT topic and the certificate used to authenticate against the MQTT broker in Azure Key Vault.

## docker-butker-mqtt-qstask

This directory contains a sample Docker compose file that will start Butler in a minimal configuration.  
Only the features needed to start Sense reload tasks based on incoming MQTT messages are enabled.

Note: Some of the configuration entries are specific to your environment and needs to be changed.  
For example:

- The MQTT broker URL
- The MQTT topic to subscribe to
- The certificate used to authenticate against the MQTT broker
- The settings associated with the repository service of the Sense server

Things that need to be changed are marked with `<CHANGE THIS>` in the `compose.yaml` and `butler-config.yaml` files.
