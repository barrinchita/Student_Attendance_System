import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attendanceId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    index: true
  },
  courseId: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String,
    enum: ['facial', 'qr', 'manual'],
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    }
  },
  deviceId: {
    type: String,
    required: false
  },
//   verified: {
//     type: Boolean,
//     default: true
//   }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
