import bcrypt from 'bcryptjs';

export default password => {
    if(password && password.length < 8) 
            throw new Error('The password must greater than 7 characters or letters');
    
    // bcryptjs provides "promise"
    return bcrypt.hash(password, 10);
}   