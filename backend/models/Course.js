const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
    },
    instructor: {
      type: String,
      required: [true, 'Please provide instructor name'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide course duration in weeks'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide course capacity'],
      default: 30,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide a course category'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
