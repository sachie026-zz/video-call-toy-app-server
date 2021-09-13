const express = require("express");
const router = express.Router();

const metricController = require("../controllers/metrics.controller");
const METRICS_BASE = "metrics";

router.post(`${METRICS_BASE}`, metricController.create);
router.get(
  `${METRICS_BASE}/:userid/:roomname`,
  metricController.findMetricsByUseridRoomname
);
module.exports = router;
