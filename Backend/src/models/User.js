const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number }, // Will be calculated from DOB
  profileImage: {
    data: Buffer, // Store image as Buffer
    contentType: String, // Store mime type
  },
  createdAt: { type: Date, default: Date.now },
});

// Add a pre-save middleware to calculate age
userSchema.pre("save", function (next) {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  this.age = age;
  next();
});

module.exports = mongoose.model("User", userSchema);
