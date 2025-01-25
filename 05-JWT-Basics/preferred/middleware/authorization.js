const jwt = require("jsonwebtoken");

const authorizationMiddleware = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer.startsWith('Bearer ')) {
    return res.status(401).json({'message': 'unauthorized'});
  }

  const token = bearer.split(' ')[1];
  if (!token) {
    return res.status(401).json({'message': 'unauthorized'});
  }

  try {
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        { algorithms: ['HS256'] }
    );
    req.user = {name: decoded.data};
    next();
  } catch (e) {
    console.log(e);

    return res.status(401).json({'message': 'unauthorized'});
  }
}

module.exports = authorizationMiddleware;
