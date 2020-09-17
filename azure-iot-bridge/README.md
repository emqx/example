# Azure IoT Hub Bridge

## 难点

Azure IoT Hub 上的 MQTT 通信有很多限制：

- 必须使用会过期的用户名、密码、ClientID 进行认证
- 一个客户端只能一个指定的 Topic 发送数据到 IoT Hub
- IoT Hub 只能使用一个指定的 Topic 发送数据到一个指定的客户端

在 EMQ X Cloud 上，你无法使用同一个设备（ClientID）即完成将 EMQ X 上的消息发送到 Azure IoT Hub，又完成接收 Azure IoT Hub 的消息并转发到 EMQ X 上；同时还方便地维护



## 方案

借助**外部应用（以下称为 交换机）**可以灵活地实现透明代理，如果你熟悉 Java, Node.js, 或者 Go 完成这个功能是很简单的，**性能也没有问题**，取决于 交换机 的配置大小。

> 可以单独为 EMQ X  编写一个插件来完成这件事情。

1. 应用与 EMQ X Cloud 使用 MQTT 连接
2. 应用与 Azure IoT 使用 SDK 或 MQTT 连接
3. 设备到云：MQTT-SN --> EMQ X Cloud --> Switch --> Azure IoT Hub
4. 云到设备：Azure IoT Hub --> Switch --> EMQ X Cloud --> MQTT-SN

![image-20200917181912341](https://static.emqx.net/images/35a91fec649ceca527ebda0192912134.png)

