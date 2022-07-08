import jwt from "jsonwebtoken";
const withAuth = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res
      .status(401)
      .json({ success: false, msg: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res
          .status(401)
          .json({ success: false, msg: "Unauthorized: Invalid Token" });
      } else {
        req.userName = decoded.userName;
        next();
      }
    });
  }
};
export default withAuth;
