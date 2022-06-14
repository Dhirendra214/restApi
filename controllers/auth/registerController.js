import Joi from 'joi';
import { User, RefreshToken } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { REFRESH_SECRET } from '../../config';

const registerController = {
    async register(req, res, next) {
    // CHECKLIST
    // [ ] validate the request
    // [ ] authorise the request
    // [ ] check if user is in the database already
    // [ ] prepare model
    // [ ] store in database
    // [ ] generate jwt token
    // [ ] send response

        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            password: Joi.string().min(3).max(30).required(),
            repeat_password: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
    // check if user is in the database already
    try {
        const exist = await User.exists({ email: req.body.email });
        if (exist) {
            return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
        }
    } catch(err) {
        return next(err);
    }
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // prepare the model

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        const result = await user.save();
        console.log(result);
    } catch(err) {
        return next(err);
    }

        res.json({ user });
    }
}


export default registerController;