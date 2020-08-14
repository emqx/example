const mqtt = require('mqtt')

const HOST = 'broker.emqx.io'
const PORT = 1883
const WS_PORT = 8083
const WSS_PORT = 8083

const TOPIC = 't/0'
const SHARE_TOPIC = '$queue/t/1'
const SHARE_GROUP_TOPIC = '$share/group1/t/2'
const SHARE_GROUP_TOPIC_2 = '$share/group2/t/2'

// 连接选项
const options = {
  clean: true,
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  username: 'emqx',
  password: 'public',
}

// 连接字符串, 通过协议指定使用的连接方式
// ws 未加密 WebSocket 连接
// wss 加密 WebSocket 连接
// mqtt 未加密 TCP 连接
// mqtts 加密 TCP 连接
// wxs 微信小程序连接
// alis 支付宝小程序连接
const connectUrl = `mqtt://${HOST}:${PORT}`
const client = mqtt.connect(connectUrl, options)

client.on('reconnect', (error) => {
  console.log('正在重连:', error)
})

client.on('error', (error) => {
  console.log('连接失败:', error)
})

client.on('connect', () => {
  console.log('连接成功')
  client.subscribe([TOPIC, SHARE_GROUP_TOPIC, SHARE_GROUP_TOPIC_2], () => {
    console.log('订阅成功')
  })
})

client.on('message', (topic, payload) => {
  console.log('收到消息：', topic, payload.toString())
})