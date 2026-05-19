const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"]
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company/Job ID is required"]
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "accepted"],
      default: "applied"
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Unique index to prevent duplicate applications from same student to same job
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
