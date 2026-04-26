const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    minCgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    package: {
      type: String,
      required: true,
      trim: true
    },
    openings: {
      type: Number,
      default: 0,
      min: 0
    },
    appliedCount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;