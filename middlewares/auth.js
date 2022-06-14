import CustomErrorHandler from '../services/CustomErrorHandler';
import JwtService from '../services/JwtService';

const auth = async (req, res, next) => {
    
    console.log('in auth starting ', req.body ,  ' + ', req.headers.authorization)
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }
     
    const token = authHeader;

    try {
        const { email } = await JwtService.verify(token);
        const user = {
            email
        }
        req.user = user;
        next();

    } catch(err) {
        return next(CustomErrorHandler.unAuthorized());
    }

}

export default auth;