import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
    
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};