const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MetricSchecma = new Schema({
  roomname: { type: String },
  userid: { type: String },
  videoRecvBitsPerSecond: { type: Number },
  videoRecvPacketLoss: { type: Number },
  videoSendBitsPerSecond: { type: Number },
  videoSendPacketLoss: { type: Number },
  created_at: { type: String },
});

// Export the model
module.exports = mongoose.model("Metric", MetricSchecma);
