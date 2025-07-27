const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const UserMetadata = require("../models/UserMetaData");
dotenv.config();
const router = express.Router();
const Counter = require('../models/Counter');

async function generateConsentRecordId() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'consentRecord' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const year = new Date().getFullYear();
  const paddedSeq = String(counter.seq).padStart(5, '0');
  return `VERIF-TN-${year}-${paddedSeq}`;
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
 
  const user = await User.findOne({ email: email});
  console.log(user)
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7h" });
 
  // Check if metadata already exists for this user
  const existingMetadata = await UserMetadata.findOne({ userId: user._id });

  if (!existingMetadata) {
    const consentRecordId = await generateConsentRecordId();

    const metadata = new UserMetadata({
      userId: user._id,
      consentRecordId: consentRecordId,
      createdAt: new Date()
    });

    await metadata.save();
  }
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
