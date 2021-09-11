const Room = require("../models/room.model");
const constants = require("../common/constants");

exports.create = (req, res) => {
  console.log("req param", req);
  fetch(constants.DAILY_ROOMS_BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${constants.API_KEY}`,
    },
    body: JSON.stringify({
      name: "test-room",
      privacy: "private",
    }),
  })
    .then((response) => response.json())
    .then((res) => res.send(res));

  // const data = req.body;
  // let room = new Room({
  //   id: data.id,
  //   name: data.name,
  //   privacy: data.privacy,
  //   url: data.url,
  //   api_created: data.api_created,
  //   created_at: data.created_at,
  // });
  // room.save(function (err) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   res.send(`Room added successfully`);
  // });
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

exports.updateRoom = (req, res) => {
  // const data = req.body;
  // let user = {};
  // if (data.name !== (null || undefined)) user.name = data.name;
  // if (data.pic !== (null || undefined)) user.pic = data.pic;
  // if (data.email !== (null || undefined)) user.email = data.email;
  // if (data.mobile_number !== (null || undefined)) user.mobile_number = data.mobile_number;
  // if (data.age !== (null || undefined)) user.age = data.age;
  // if (data.fblink !== (null || undefined)) user.fblink = data.fblink;
  // if (data.linked_in_link !== (null || undefined)) user.linked_in_link = data.linked_in_link;
  // if (data.gender !== (null || undefined)) user.gender = data.gender;
  // if (data.interested_sports !== (null || undefined)) user.interested_sports = data.interested_sports;
  // if (data.location !== (null || undefined)) user.location = data.location;
  // if (data.about !== (null || undefined)) user.about = data.about;
  // if (data.profession !== (null || undefined)) user.profession = data.profession;
  // if (data.user_type !== (null || undefined)) user.user_type = data.user_type;
  // User.updateOne(
  //     { "id": req.params.id },
  //     { $set: user },
  //     (err) => {
  //         if (err) return res.status(500).send({ message: err || 'Unable to update the profile' });
  //         return res.send({ "updated user profile": user });
  //     }
  // );
};

exports.deleteRoom = (req, res) => {
  Room.findByIdAndRemove({ id: req.params.roomid }, (err, room) => {
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
};
