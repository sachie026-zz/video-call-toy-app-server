const Room = require("../models/room.model");
const axios = require("axios");
const constants = require("../common/constants");

exports.create = async (req, res) => {
  let requestBody = req.params.name;
  let data = null;

  await axios
    .post(
      constants.DAILY_ROOMS_BASE_URL,
      {
        name: requestBody,
        privacy: "public",
      },
      constants.CONFIG
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      res.send(err);
    });

  // check if room created with id prop
  if (data && data.id) {
    let room = new Room({
      id: data.id,
      name: data.name,
      privacy: data.privacy,
      url: data.url,
      api_created: data.api_created,
      created_at: data.created_at,
      participants: [],
    });
    room.save(function (err) {
      if (err) {
        return console.error(err);
      }
      res.set("Access-Control-Allow-Origin", "*");
      res.send(data);
    });
  }
};

exports.findAll = (req, res) => {
  Room.find()
    .sort({ created_at: -1 })
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving rooms.",
      });
    });
};

exports.findById = (req, res) => {
  Room.find()
    .sort({ created_at: -1 })
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving rooms.",
      });
    });
};

exports.updateRoomParticipants = (req, res) => {
  const data = req.body;
  let participantsToUpdate = {
    userid: data.userid,
  };

  Room.updateOne(
    { name: req.params.roomname },
    { $addToSet: { participants: participantsToUpdate } },
    (err) => {
      if (err)
        return res
          .status(500)
          .send({ message: err || "Unable to update the participants" });
      return res.send("Participants updted");
    }
  );
};

exports.deleteRoom = async (req, res) => {
  let data = null;
  const roomName = req.params.name;
  await axios
    .delete(`${constants.DAILY_ROOMS_BASE_URL}/${roomName}`, constants.CONFIG)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => res.send(err));

  // check if room deleted from the daily.co
  if (data && data.deleted) {
    Room.deleteOne({ name: roomName }, (err, room) => {
      if (err)
        return res
          .status(500)
          .send({ message: err.message || "Error occured, room not deleted" });
      const response = {
        message: "Room successfully deleted",
        id: room.id,
      };
      return res.status(200).send(response);
    });
  } else {
    return res.status(500).send({
      message: err.message || "Error occured, while deleting the room",
    });
  }
};
