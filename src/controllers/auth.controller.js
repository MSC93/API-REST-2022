import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    //jwt token

    return res.status(200).json({ ok: "register save" });
  } catch (err) {
    console.log(err.code);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Ya existe el usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw new Error("Email or password is incorrect");

    // const { token, expiresIn } = generateToken(user.id);
    // generateRefreshToken(user.id, res);
    // return res.json({ token, expiresIn });

    //generar el token jwt
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err.message });
  }
};
