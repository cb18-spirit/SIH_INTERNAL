import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: 'Please login first' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      req.userId = decoded.id; // <-- store here instead of req.body
      next();
    } else {
      return res.json({ success: false, message: 'Token is not valid' });
    }

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export default userAuth;
