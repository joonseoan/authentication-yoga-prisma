import jwt from 'jsonwebtoken';

export default userId => jwt.sign({ userId }, 'mysolution', { expiresIn: '7 days' });
