const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RoomSchecma = new Schema({
  name: { type: String },
  id: { type: String },
  created_at: { type: String },
  privacy: { type: String },
  url: { type: String },
  api_created: { type: Boolean },
  participants: [
    {
      type: String,
    },
  ],
});

// Export the model
module.exports = mongoose.model("Room", RoomSchecma);
