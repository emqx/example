import certifi
import paho.mqtt.client as mqtt


def on_connect(client, userdata, flags, rc):
    # rc 为响应码
    # 0: 连接成功
    # 1: 连接失败-不正确的协议版本
    # 2: 连接失败-无效的客户端标识符
    # 3: 连接失败-服务器不可用
    # 4: 连接失败-错误的用户名或密码
    # 5: 连接失败-未授权
    # 6-255: 未定义
    # 如果是其它问题，可以检查网络情况，或者确认是否安装了 `paho-mqtt`。
    print(f"rc: {rc}")


def on_message(client, userdata, msg):
    print(f"topic: {msg.topic}, qos: {msg.qos}, payload: {msg.payload} ")


def on_subscribe(mqttc, obj, mid, granted_qos):
    print(f"Subscribed: {mid} {granted_qos}")


# 如果可以设置 client_id, 如果没设置，会提供一个随机 ID
# mqtt_client = mqtt.Client(client_id="test-id")
mqtt_client = mqtt.Client()

# 设置回调函数
mqtt_client.on_message = on_message
mqtt_client.on_connect = on_connect
mqtt_client.on_subscribe = on_subscribe

# 设置 tls，这里使用的是 python 自带的证书
# 如果提示错误，请通过 pip install certifi 安装
ca_cert = certifi.where()
mqtt_client.tls_set(ca_certs=ca_cert)

# connection 三个参数分别为：连接地址、端口号、keepalive
# emqx 中 wss 协议使用的是 8883 端口
mqtt_client.connect("broker.emqx.io", 8883, 60)

# 订阅主题
mqtt_client.subscribe("$SYS/#")

# 设置网络循环堵塞，在调用 disconnect() 或程序崩溃前，不会主动结束程序
mqtt_client.loop_forever()
