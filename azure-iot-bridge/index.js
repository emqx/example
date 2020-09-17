// Azure IoT Hub SDK
const { Client, Message } = require('azure-iot-device');
const Protocol = require('azure-iot-device-mqtt').Mqtt;

// MQTT Client lib
const mqtt = require('mqtt')

// create a EMQ X mqtt client
const emqxClient = mqtt.connect('mqtt://broker.emqx.io', {
  username: 'emqx',
  password: 'public'
})

emqxClient.on('connect', () => {
  console.log('EMQ X Ready')
  emqxClient.subscribe('devices/+/messages/events')
})


emqxClient.on('message', (topic, payload) => {
  // topic devices/{device_id}/messages/events
  // payload
  const deviceid = topic.split('/')[1]
  // find azure iot device
  const azureDevice = azureDevicesPool[deviceid]
  if (!azureDevice) {
    return
  }
  console.log(`Send to Azure IoT Hub by device: ${deviceid}`)
  azureDevice.sendEvent(new Message(payload))
})

const azureDevicesPool = {}


createAzureDevice('HostName=emqx-cloud.azure-devices.net;DeviceId=one;SharedAccessKey=5zFC61rShR0ThCRl8b39vTmCVy0KisNazZI+99ugITg=')

/**
 * Create Azure IoT Hub Device and bind message exchange
 * @param {*} connStr Azure Iot Hub ConnStr
 */
function createAzureDevice(connStr = '') {
  // Create a Azure device
  const client = Client.fromConnectionString(
    connStr,
    Protocol
  )
  // get DeviceId
  const deviceId = connStr.match(/DeviceId=(.+)(?=;)/)[1]
  // HostName=emqx-cloud.azure-devices.net;DeviceId=one;SharedAccessKey=5zFC61rShR0ThCRl8b39vTmCVy0KisNazZI+99ugITg=
  client.open((err) => {
    if (err) {
      console.error('Could not connect: ' + err);
      return
    }
    azureDevicesPool[deviceId] = client

    console.log(`Azure Device:${deviceId} Ready`);
    
    // receive from azure iot
    client.on('message', function (msg) {
      console.log(`Send to EMQ X Cloud from Azure IoT Hub device: ${deviceId}`)
      emqxClient.publish(
        msg.to,
        msg.data
      )
    });
  })
}
