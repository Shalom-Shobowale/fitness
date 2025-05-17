// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../modals/Admin.js';
import User from '../modals/User.js';

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized - No token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // First, check if admin
        const admin = await Admin.findById(decoded.id).select('-password');
        if (admin) {
            req.admin = {
                id: admin._id,
                isAdmin: true,
            };
            return next();
        }

        // If not admin, check if user
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
            req.user = {
                id: user._id,
                isAdmin: false,
            };
            return next();
        }

        // If neither found
        return res.status(401).json({ message: 'Not authorized - User/Admin not found' });

    } catch (err) {
        console.error('🔒 Token verification failed:', err.message);
        return res.status(401).json({ message: 'Not authorized - Invalid token' });
    }
};
