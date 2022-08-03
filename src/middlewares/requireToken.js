import jwt from "jsonwebtoken";

//para refresh token
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("no existe el token bearer");

    token = token.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
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

//para cookie
// export const requireToken = (req, res, next) => {
//   try {
//     let token = req.cookies.cookie;
//     if (!token) throw new Error("no existe el token bearer");

//     // token = token.split(" ")[1];

//     const { uid } = jwt.verify(token, process.env.JWT_SECRET);

//     req.uid = uid;

//     next();
//   } catch (error) {
//     const tokenVerificationErrors = {
//       "invalid signature": "la firma no es valida",
//       "jwt expired": "jwt expirado",
//       "invalid token": "token no es valido",
//       "No Bearer": "Utiliza formato Bearer",
//       "jwt malformed": "JWT formato invalido",
//     };
//     console.log(error);
//     return res
//       .status(401)
//       .json({ error: tokenVerificationErrors[error.message] });
//   }
// };

//para localstorage
// export const requireToken = (req, res, next) => {
//   try {
//     let token = req.headers?.authorization;
//     if (!token) throw new Error("no existe el token bearer");

//     token = token.split(" ")[1];

//     const { uid } = jwt.verify(token, process.env.JWT_SECRET);

//     req.uid = uid;

//     next();
//   } catch (error) {
//     const tokenVerificationErrors = {
//       "invalid signature": "la firma no es valida",
//       "jwt expired": "jwt expirado",
//       "invalid token": "token no es valido",
//       "No Bearer": "Utiliza formato Bearer",
//       "jwt malformed": "JWT formato invalido",
//     };
//     console.log(error);
//     return res
//       .status(401)
//       .json({ error: tokenVerificationErrors[error.message] });
//   }
// };
