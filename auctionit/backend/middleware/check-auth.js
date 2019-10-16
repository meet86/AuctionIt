const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'this_is_secret_string_lol_rofl');
    console.log('LOL: ' + decoded.email);
    req.useremail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ message: 'auth faied' });
  }
}
