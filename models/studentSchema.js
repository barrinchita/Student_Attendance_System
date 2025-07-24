import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  departmentId: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['100', '200', '300', '400', '500'],
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  profileImage: {
    type: String,
    required: false // URL or filename stored on server
  },
  faceDescriptor: {
    type: Array,
    required: false // For facial recognition: store face embedding data
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', StudentSchema);
export default Student;
