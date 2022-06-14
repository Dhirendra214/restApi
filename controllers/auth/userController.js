import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const userController = {
    async findAll(req, res, next) {
        console.log('Me here......', req.user )
        try {
            const users = await User.find().select('-password -updatedAt -__v');
            console.log(' Me me ', users)
            if (!users) {
                return next(CustomErrorHandler.notFound());
            }
            res.json(users);
        } catch(err) {
           return next(err);
        }
    }
};

export default userController;