const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert the profile image to base64 for sending to client
    const profileImageData = user.profileImage.data
      ? {
          contentType: user.profileImage.contentType,
          data: user.profileImage.data.toString("base64"),
        }
      : null;

    // Create a response object without the Buffer data
    const userResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      companyName: user.companyName,
      dateOfBirth: user.dateOfBirth,
      age: user.age,
      profileImage: profileImageData,
      createdAt: user.createdAt,
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
