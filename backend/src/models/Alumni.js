import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation year is required'],
    min: [1900, 'Graduation year must be after 1900'],
    max: [new Date().getFullYear() + 10, 'Graduation year cannot be more than 10 years in the future']
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true,
    maxlength: [100, 'Degree cannot exceed 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters']
  },
  currentCompany: {
    type: String,
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  currentPosition: {
    type: String,
    trim: true,
    maxlength: [200, 'Position cannot exceed 200 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  linkedin: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'Please enter a valid LinkedIn profile URL']
  },
  achievements: [{
    type: String,
    trim: true,
    maxlength: [500, 'Achievement cannot exceed 500 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
alumniSchema.index({ graduationYear: 1 });
alumniSchema.index({ department: 1 });
alumniSchema.index({ degree: 1 });
alumniSchema.index({ isActive: 1 });
alumniSchema.index({ user: 1 });

// Compound indexes for common queries
alumniSchema.index({ department: 1, graduationYear: 1 });
alumniSchema.index({ isActive: 1, department: 1 });

export default mongoose.model('Alumni', alumniSchema);

