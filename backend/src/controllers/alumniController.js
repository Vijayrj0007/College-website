import Alumni from '../models/Alumni.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/error.js';

// @desc    Get all alumni with pagination and search
// @route   GET /api/alumni
// @access  Public
export const list = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const search = req.query.search || '';
  const department = req.query.department || '';
  const graduationYear = req.query.graduationYear || '';
  const isActive = req.query.isActive;

  // Build query
  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { degree: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } },
      { currentCompany: { $regex: search, $options: 'i' } },
      { currentPosition: { $regex: search, $options: 'i' } }
    ];
  }

  if (department) {
    query.department = { $regex: department, $options: 'i' };
  }

  if (graduationYear) {
    query.graduationYear = parseInt(graduationYear);
  }

  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const skip = (page - 1) * limit;

  const [alumni, total] = await Promise.all([
    Alumni.find(query)
      .populate('user', 'email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Alumni.countDocuments(query)
  ]);

  res.json({
    success: true,
    alumni,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single alumni
// @route   GET /api/alumni/:id
// @access  Public
export const detail = asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.params.id).populate('user', 'email role');

  if (!alumni) {
    return res.status(404).json({
      success: false,
      message: 'Alumni not found'
    });
  }

  res.json({
    success: true,
    alumni
  });
});

// @desc    Create new alumni
// @route   POST /api/alumni
// @access  Private (Alumni role)
export const create = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    graduationYear,
    degree,
    department,
    currentCompany,
    currentPosition,
    location,
    phone,
    linkedin,
    achievements,
    isActive = true
  } = req.body;

  // Check if user exists and has alumni role
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  if (user.role !== 'alumni') {
    return res.status(403).json({
      success: false,
      message: 'Only alumni can create alumni profiles'
    });
  }

  // Check if alumni profile already exists for this user
  const existingAlumni = await Alumni.findOne({ user: req.user.id });
  if (existingAlumni) {
    return res.status(400).json({
      success: false,
      message: 'Alumni profile already exists for this user'
    });
  }

  // Check if email is already used by another alumni
  const emailExists = await Alumni.findOne({ email: email.toLowerCase() });
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists in alumni database'
    });
  }

  const alumni = await Alumni.create({
    name,
    email: email.toLowerCase(),
    graduationYear,
    degree,
    department,
    currentCompany,
    currentPosition,
    location,
    phone,
    linkedin,
    achievements: achievements || [],
    isActive,
    user: req.user.id
  });

  const populatedAlumni = await Alumni.findById(alumni._id).populate('user', 'email role');

  res.status(201).json({
    success: true,
    alumni: populatedAlumni
  });
});

// @desc    Update alumni
// @route   PUT /api/alumni/:id
// @access  Private (Alumni owner or Admin)
export const update = asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.params.id);

  if (!alumni) {
    return res.status(404).json({
      success: false,
      message: 'Alumni not found'
    });
  }

  // Check if user is the owner or admin
  if (alumni.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this alumni profile'
    });
  }

  const {
    name,
    email,
    graduationYear,
    degree,
    department,
    currentCompany,
    currentPosition,
    location,
    phone,
    linkedin,
    achievements,
    isActive
  } = req.body;

  // Check if email is being changed and if it's already used
  if (email && email.toLowerCase() !== alumni.email) {
    const emailExists = await Alumni.findOne({ 
      email: email.toLowerCase(),
      _id: { $ne: req.params.id }
    });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in alumni database'
      });
    }
  }

  const updatedAlumni = await Alumni.findByIdAndUpdate(
    req.params.id,
    {
      ...(name && { name }),
      ...(email && { email: email.toLowerCase() }),
      ...(graduationYear && { graduationYear }),
      ...(degree && { degree }),
      ...(department && { department }),
      ...(currentCompany !== undefined && { currentCompany }),
      ...(currentPosition !== undefined && { currentPosition }),
      ...(location !== undefined && { location }),
      ...(phone !== undefined && { phone }),
      ...(linkedin !== undefined && { linkedin }),
      ...(achievements !== undefined && { achievements }),
      ...(isActive !== undefined && { isActive })
    },
    { new: true, runValidators: true }
  ).populate('user', 'email role');

  res.json({
    success: true,
    alumni: updatedAlumni
  });
});

// @desc    Delete alumni
// @route   DELETE /api/alumni/:id
// @access  Private (Alumni owner or Admin)
export const remove = asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.params.id);

  if (!alumni) {
    return res.status(404).json({
      success: false,
      message: 'Alumni not found'
    });
  }

  // Check if user is the owner or admin
  if (alumni.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this alumni profile'
    });
  }

  await Alumni.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Alumni profile deleted successfully'
  });
});

// @desc    Search alumni
// @route   GET /api/alumni/search
// @access  Public
export const search = asyncHandler(async (req, res) => {
  const { q, department, graduationYear, degree, isActive } = req.query;

  let query = {};

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { degree: { $regex: q, $options: 'i' } },
      { department: { $regex: q, $options: 'i' } },
      { currentCompany: { $regex: q, $options: 'i' } },
      { currentPosition: { $regex: q, $options: 'i' } }
    ];
  }

  if (department) {
    query.department = { $regex: department, $options: 'i' };
  }

  if (graduationYear) {
    query.graduationYear = parseInt(graduationYear);
  }

  if (degree) {
    query.degree = { $regex: degree, $options: 'i' };
  }

  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const alumni = await Alumni.find(query)
    .populate('user', 'email role')
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({
    success: true,
    alumni
  });
});

// @desc    Get alumni statistics
// @route   GET /api/alumni/stats
// @access  Public
export const getStats = asyncHandler(async (req, res) => {
  const [
    total,
    active,
    departmentStats,
    graduationYearStats
  ] = await Promise.all([
    Alumni.countDocuments(),
    Alumni.countDocuments({ isActive: true }),
    Alumni.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]),
    Alumni.aggregate([
      { $group: { _id: '$graduationYear', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ])
  ]);

  const byDepartment = {};
  departmentStats.forEach(stat => {
    byDepartment[stat._id] = stat.count;
  });

  const byGraduationYear = {};
  graduationYearStats.forEach(stat => {
    byGraduationYear[stat._id] = stat.count;
  });

  res.json({
    success: true,
    stats: {
      total,
      active,
      byDepartment,
      byGraduationYear
    }
  });
});

// Named exports used above

