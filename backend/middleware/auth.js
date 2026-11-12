const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Authentication required.' });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }

  try {
    const user = await User.findById(payload.id).select('role clubId club').lean();
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
    req.auth = {
      ...payload,
      role: user.role,
      clubId: user.clubId,
      club: user.club || payload.club,
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Could not verify account permissions.' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.auth?.role !== role) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
}

module.exports = { authenticate, requireRole };
