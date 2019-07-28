import jwt from 'jsonwebtoken';


// 2) usint default authentication value
/* 
    It is for the item which is ristricted to be accessed by the login user
    Without the token, it gets caught in "throw Error" class.
    Therefore, in mutations, withouth token, it generates an error!!! and working stops.
    If the second arg is not invoked, it is still "true"
    1)
    requireAuth = true => user does not have authority. ==> generates an error
    
    // Even though the user does not the token, they are able to access to the public items
    // For instance, in this scenario, the "published === true" post can be accessed by any user.
    2)
    requireAuth = false => user has authority ===> no error
*/

// 2) In order to grant access to public items
export default (request, requireAuth = true) => {

// 1) In this case, all items are accessed only by the login user
// export default (request) => {

    // 3)
    // Creating a dynamic token information (on a basis of "request.request")
    const header = request.request ?  
        request.request.headers.authorization :
        request.connection.context.Authorization;

    // 2) for prisma subscription using websocket.
    // const header = request.connection.context.Authorization;


    // 1) for prisma mutation and query using startdard http request
    // request.request ==> req.
    // const header = request.request.headers.authorization;

    // 2) With args
    if(header) {
        const token = header.replace('Bearer ', '');
        const decode = jwt.verify(token, 'mysolution')
        return decode.userId;
    }

    if(requireAuth) {
        throw new Error('Authentication required.');
    }

    return null;

    // 1) Without "requireAuth args"
    // if(!header) {
    //     throw new Error('Authentication is required.');
    // }

    // const token = header.replace('Bearer ', '');
    // const decode = jwt.verify(token, 'mysolution')

    // return decode.userId;
   //  return token;
}