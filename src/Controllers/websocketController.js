const express = require("express");
const http = require("http");
const UpstoxClient = require("upstox-js-sdk");
const { WebSocket } = require("ws");
const protobuf = require("protobufjs");
const mongoose = require("mongoose");
const { getAccessToken } = require("../Utiles/fetchAccessToken");
const InstrumentKeys = mongoose.model("InstrumentKeys", {});
const socketIo = require("socket.io");

let instrumentKeysArray = [];

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const wss = new WebSocket.Server({ server });

let protobufRoot = null;
let apiVersion = "2.0";

// Function to authorize the market data feed
const getMarketFeedUrl = async (accessToken) => {
  return new Promise((resolve, reject) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    let OAUTH2 = defaultClient.authentications["OAUTH2"];
    OAUTH2.accessToken = accessToken;

    let apiInstance = new UpstoxClient.WebsocketApi();
    // Call the getMarketDataFeedAuthorize function from the API
    apiInstance.getMarketDataFeedAuthorize(
      apiVersion,
      (error, data, response) => {
        if (error) reject(error);
        else resolve(data.data.authorizedRedirectUri);
      }
    );
  });
};

// Function to initialize the protobuf part
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(__dirname + "/MarketDataFeed.proto");
  console.log("Protobuf part initialization complete");
};

const instrument_key_data_function = async () => {
  try {
    const allKeys = await InstrumentKeys.find({});
    const stringKey = JSON.stringify(allKeys);
    const parseKey = JSON.parse(stringKey);
    instrumentKeysArray = parseKey.map((key) => key.instrument_key);
  } catch (error) {
    console.error("Error:", error);
  }
};

setInterval(async () => {
  await instrument_key_data_function();
}, 2000);


const connectWebSocket = async (wsUrl, accessToken) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: {
        "Api-Version": apiVersion,
        Authorization: "Bearer " + accessToken,
      },
      followRedirects: true,
    });

    ws.on("open", () => {
      console.log("connected");
      resolve(ws);
      setTimeout(() => {
        const data = {
          guid: "someguid",
          method: "sub",
          data: {
            mode: "full",
            instrumentKeys: instrumentKeysArray,
          },
        };
        ws.send(Buffer.from(JSON.stringify(data)));
      }, 1000);
    });

    ws.on("close", () => {
      console.log("disconnected");
    });

    io.on("connection", (socket) => {
      console.log("A user connected");
      // Emit initial data or do other operations upon connection if needed
    });

    ws.on("message", (data) => {
      let socketData = JSON.stringify(decodeProtobuf(data));
      sendDataToClients(socketData);

      let dataWithShareNames = addShareNames(socketData);

      io.emit("message", socketData);

      console.log(dataWithShareNames);
    });


    function addShareNames(data) {
      // Clone the original data to avoid mutation
      let newData = JSON.parse(JSON.stringify(data));
      // Loop through each instrument key in the data and add share names
      for (let key in newData.feeds) {
          if (newData.feeds.hasOwnProperty(key)) {
              newData.feeds[key].shareName = instrumentKeyToShareName[key] || "Unknown"; // If share name is not found, set as "Unknown"
          }
      }
      return newData;
  }

    function sendInstrumentKeys() {
      const data = {
        guid: "someguid",
        method: "sub",
        data: {
          mode: "full",
          instrumentKeys: instrumentKeysArray,
        },
      };
      ws.send(Buffer.from(JSON.stringify(data)));
    }

    // Update instrumentKeysArray dynamically
    function updateInstrumentKeys(newKeys) {
      instrumentKeysArray = newKeys;
      sendInstrumentKeys();
    }

    setInterval(() => {
      updateInstrumentKeys(instrumentKeysArray);
    }, 1000);

    ws.on("error", (error) => {
      console.log("error:", error);
      reject(error);
    });
  });
};

// Function to decode protobuf message
const decodeProtobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }

  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

// Controller function to handle initialization and WebSocket connection
const initializeAndConnect = async () => {
  try {
    await initProtobuf(); // Initialize protobuf
    const accessToken = await getAccessToken();
    const wsUrl = await getMarketFeedUrl(accessToken);
    const ws = await connectWebSocket(wsUrl, accessToken);
    return ws;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

// Function to send data to connected clients
const sendDataToClients = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log(`Received message from client: ${message}`);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// Start the server
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = {
  initializeAndConnect,
};
