const express = require("express");
const router = express.Router();

const roomController = require("../controllers/metrics.controller");
const METRICS_BASE = "/metrics";

router.post(`${METRICS_BASE}`, roomController.create);
router.get(`${METRICS_BASE}/:userid/:roomname`, roomController.findMetrics);
module.exports = router;
