import jwt from 'jsonwebtoken';

export default (request) => {
    // request.request ==> req.
    console.log(request.request.headers.authorization)
    const header = request.request.headers.authorization;

    if(!header) {
        throw new Error('Authentication is required.');
    }

    const token = header.replace('Bearer ', '');
    const decode = jwt.verify(token, 'mysolution')

    return decode.userId;
   //  return token;
}