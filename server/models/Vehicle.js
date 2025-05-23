import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: true,
    enum: ['car', 'motorcycle', 'truck'],
    default: 'car'
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['parked', 'exited'],
    default: 'parked'
  },
  parkingSpot: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Vehicle', vehicleSchema);