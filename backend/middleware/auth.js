import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.headers.token;  // ya req.headers['token']
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id };  // Yahan req.user set karna important
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
  }
};

export default authUser;
