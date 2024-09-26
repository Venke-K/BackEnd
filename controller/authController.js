import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import process from "process";
// import createToken from "../middleware/authMiddleware.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking if the user exists already
    let existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(400).json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User Created successfully",
      token,
    });

    // const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: '1hr'})
    // res.status(201).json({newUser,token});
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    //checking if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    //checking the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ messagev: "Invalid Credentials" });

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).send({
      message: "login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  registerUser,
  loginUser,
};
