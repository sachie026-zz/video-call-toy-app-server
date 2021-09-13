const Metric = require("../models/metric.model");

exports.create = async (req, res) => {
  let data = req.body;
  let metric = new Metric({
    userid: data.id,
    roomname: data.name,
    videoRecvBitsPerSecond: data.videoRecvBitsPerSecond,
    videoRecvPacketLoss: data.videoRecvPacketLoss,
    videoSendBitsPerSecond: data.videoSendBitsPerSecond,
    videoSendPacketLoss: data.videoSendPacketLoss,
    created_at: new Date(),
  });
  metric.save(function (err) {
    if (err) {
      return console.error(err);
    }
    res.send("Metric saved successfully");
  });
};

exports.findMetricsByUseridRoomname = (req, res) => {
  const userid = req.params.userid;
  const roomname = req.params.roomname;
  Metric.find({
    userid: userid,
    roomname: roomname,
  })
    .sort({ created_at: -1 })
    .then((metrics) => {
      res.send(metrics);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving metrics.",
      });
    });
};
