const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    minCgpa: {
      type: Number,
      required: [true, "Minimum CGPA requirement is required"],
      min: [0, "CGPA cannot be negative"],
      max: [10, "CGPA cannot exceed 10"]
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required skills are mandatory"],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: "At least one required skill is needed"
      }
    },
    packageOffered: {
      type: Number,
      min: [0, "Package cannot be negative"]
    },
    location: {
      type: String,
      trim: true
    },
    jobRole: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
