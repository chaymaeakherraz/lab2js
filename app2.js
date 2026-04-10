const WebSocketServer = require("ws").Server;
const CSVToJSON = require("csvtojson");

const wss = new WebSocketServer({ port: 5002 });

console.log("✅ WebSocket server running on ws://localhost:5002");

wss.on("connection", async (ws) => {
  console.log("🔵 Client connected");

  try {
    const data = await CSVToJSON().fromFile("temp.csv");

    let i = 0;

    const timer = setInterval(() => {
      if (i < data.length) {
        ws.send(JSON.stringify(data[i]));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 3000);

    ws.on("close", () => {
      clearInterval(timer);
      console.log("🔴 Client disconnected");
    });

  } catch (err) {
    console.log("❌ Error:", err);
  }
});