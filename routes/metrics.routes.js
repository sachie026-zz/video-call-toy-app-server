const express = require("express");
const router = express.Router();

const roomController = require("../controllers/metrics.controller");
const METRICS_BASE = "/metrics";

router.post(`/`, roomController.create);
router.get(`/:userid/:roomname`, roomController.findMetrics);
module.exports = router;
