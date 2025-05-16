const mongoose = require("mongoose");

const timelineEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ["Pending", "Completed"] },
  date: { type: Date, default: Date.now }, // Store the timestamp
});

module.exports = mongoose.model("TimelineEvent", timelineEventSchema);
