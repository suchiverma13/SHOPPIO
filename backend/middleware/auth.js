// backend/middleware/auth.js

import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
  }
};

export default authUser;
