const mongoose = require("mongoose");

const noteListSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    deletedNote: {
      type: Number,
      required: false,
      default: 0,
    },
    noteTitle: {
      type: String,
      required: [true, "Please add the note title"],
    },
    note: {
      type: String,
      required: [true, "Please add the note details"],
    },
    createdAt: {
      type: Date,
      required: [false, "Please add the created at"],
    },
    lastUpdate: {
      type: Date,
      required: [false, "Please add the last update"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("noteList", noteListSchema);
