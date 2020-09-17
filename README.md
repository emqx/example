# EMQ X example

这是 EMQ X 系列产品代码及项目示例仓库，包括各类编程语言 MQTT、MQTT-SN、CoAP 等协议的连接代码，EMQ X REST API 调用方法等。


## 示例列表

### 客户端库

- [Java MQTT 客户端](./mqtt-client-Java)
- [Node.js MQTT 客户端](./mqtt-client-Node.js)
- [Android 安卓 MQTT 客户端](./mqtt-client-Android)
- [Python MQTT 客户端](./mqtt-client-Python3)

## 提交示例基础要求

1. 提供完整的项目结构，简单的项目启动操作说明，而不只是代码片段，如 Java 项目需要有 Maven 配置文件，Node.js 项目需要有 package.json 文件

2. 在目录的 README 里面介绍清楚场景需求，如果代码中需要连接 MQTT 服务器，使用以下信息：

```bash
host: broker.emqx.io
port:
  - 1883（TCP）
  - 8883（TCP/TLS）
  - 8083（ws）
  - 8084（wss）
clientid: 任意随机
username: emqx
password: public
```

3. 每个项目自行维护 .gitignore 文件，禁止提交不必要的文件
