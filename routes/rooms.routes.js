const express = require("express");
const router = express.Router();

const roomController = require("../controllers/rooms.controller");
const ROOMS_BASE = "/rooms";

router.post(`${ROOMS_BASE}/:name`, roomController.create);
router.get(`${ROOMS_BASE}`, roomController.findAll);
router.get(`${ROOMS_BASE}/:id`, roomController.findById);
router.delete(`${ROOMS_BASE}/:name`, roomController.deleteRoom);
router.put(
  `${ROOMS_BASE}/participants/:roomname`,
  roomController.updateRoomParticipants
);
module.exports = router;
