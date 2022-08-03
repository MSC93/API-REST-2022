import { User } from "../models/User.js";
import {
  generateToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
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

    //generar el token jwt
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user.id, res);

    //generar cookie
    // res.cookie("cookie", token, {
    //   httpOnly: true,
    //   secure: !(process.env.MODO === "developer"), //esto funciona con https pero como trabajo bajo http local esto me permite dejarlo en true el dia que no este en local
    // });

    return res.status(200).json({ token, expiresIn });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err.message });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.uid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    let refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el refreshToken");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    const { token, expiresIn } = generateToken(uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    const tokenVerificationErrors = {
      "invalid signature": "la firma no es valida",
      "jwt expired": "jwt expirado",
      "invalid token": "token no es valido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato invalido",
    };
    console.log(error);
    return res
      .status(401)
      .json({ error: tokenVerificationErrors[error.message] });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ out: true });
};
