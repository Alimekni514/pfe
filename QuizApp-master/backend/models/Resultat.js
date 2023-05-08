const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizCode: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
