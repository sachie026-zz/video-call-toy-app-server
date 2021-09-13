const express = require("express");
const router = express.Router();

const roomController = require("../controllers/rooms.controller");
const ROOMS_BASE = "/rooms";
const PARTICIPANTS_BASE = "/participants";

router.post(`${ROOMS_BASE}/:name`, roomController.create);
router.get(`${ROOMS_BASE}`, roomController.findAll);
router.get(`${ROOMS_BASE}/:id`, roomController.findById);
router.delete(`${ROOMS_BASE}/:name`, roomController.deleteRoom);
router.put(
  `${PARTICIPANTS_BASE}/:roomname`,
  roomController.updateRoomParticipants
);
module.exports = router;
