const express = require('express');
const http = require('http');
const UpstoxClient = require('upstox-js-sdk');
const { WebSocket } = require('ws');
const protobuf = require('protobufjs');
const { getAccessToken } = require('../Utiles/fetchAccessToken');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let protobufRoot = null;
let apiVersion = '2.0';

// Function to authorize the market data feed
const getMarketFeedUrl = async (accessToken) => {
  return new Promise((resolve, reject) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    let OAUTH2 = defaultClient.authentications["OAUTH2"];
    OAUTH2.accessToken = accessToken;

    let apiInstance = new UpstoxClient.WebsocketApi(); // Create new Websocket API instance
    // Call the getMarketDataFeedAuthorize function from the API
    apiInstance.getMarketDataFeedAuthorize(
      apiVersion,
      (error, data, response) => {
        if (error) reject(error); // If there's an error, reject the promise
        else resolve(data.data.authorizedRedirectUri); // Else, resolve the promise with the authorized URL
      }
    );
  });
};

// Function to initialize the protobuf part
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(__dirname + '/MarketDataFeed.proto');
  console.log('Protobuf part initialization complete');
};


const connectWebSocket = async (wsUrl, accessToken) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: {
        "Api-Version": apiVersion,
        Authorization: "Bearer " + accessToken,
      },
      followRedirects: true,
    });

    // WebSocket event handlers
    ws.on("open", () => {
      console.log("connected");
      resolve(ws); // Resolve the promise once connected

      // Set a timeout to send a subscription message after 1 second
      setTimeout(() => {
        const data = {
          guid: "someguid",
          method: "sub",
          data: {
            mode: "full",
            instrumentKeys: ["NSE_INDEX|Nifty Bank", "NSE_INDEX|Nifty 50", "NSE_EQ|INE002A01018"],
          },
        };
        ws.send(Buffer.from(JSON.stringify(data)));
      }, 1000);
    });

    ws.on("close", () => {
      console.log("disconnected");
    });

    ws.on("message", (data) => {
      let socketData = JSON.stringify(decodeProtobuf(data))
      sendDataToClients(socketData);
      console.log(socketData); // Decode the protobuf message on receiving it
    });

    ws.on("error", (error) => {
      console.log("error:", error);
      reject(error); // Reject the promise on error
    });
  });
};


// Function to decode protobuf message
const decodeProtobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn('Protobuf part not initialized yet!');
    return null;
  }

  const FeedResponse = protobufRoot.lookupType('com.upstox.marketdatafeeder.rpc.proto.FeedResponse');
  return FeedResponse.decode(buffer);
};

// Controller function to handle initialization and WebSocket connection
const initializeAndConnect = async () => {
  try {
    await initProtobuf(); // Initialize protobuf
    const accessToken = await getAccessToken();
    const wsUrl = await getMarketFeedUrl(accessToken);
    const ws = await connectWebSocket(wsUrl, accessToken); // Connect to the WebSocket
    return ws;
  } catch (error) {
    console.error('An error occurred:', error);
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
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Start the server
server.listen(3001, () => {
  console.log('Server is running on port 3001');
});


module.exports = {
  initializeAndConnect
}