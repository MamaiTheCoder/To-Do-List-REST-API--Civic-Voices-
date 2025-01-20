// extend is a method from the lodash library that allows us to merge two objects
import extend from "lodash/extend.js";


import User from '../models/user.model.js';

const create = async (req, res) => {
    try {
        const newUser = await new User(req.body);

        console.log(newUser);
        

        await newUser.save();

        if (!newUser) {
            return res.status(400).json({error: 'Cannot create your account'})
        }

        return res.status(200).json({
            message: "Successfully signed up!",
        });
    } catch (error) {
        console.log('error in create controller: ', error.message);
        res.status(500).json({ error: error.message});
    }
};

const list = async (req, res) => {
    try {
        const users = await User.find().select('username email created, updated');

        if (!users) {
            return res.status(400).json('No users found in the database');
        }

        return res.status(200).json(users);
    } catch (error) {
        console.log('error in list controller: ', error.message);
        res.status(500).json({ error: 'Internal server error'});
    }
};

const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('error in userById controller: ', error.message);
        res.status(500).json({ error: 'Internal server error'});
    }
    
};

const retrive = async (req, res) => {
    req.user.hashed_password = undefined;
    req.user.salt = undefined;
    return res.json(req.user);
};

const update = async (req, res) => {
    try {
        let user = req.user;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (error) {
        console.log('Error in update controller: ', error.message)
        return res.status(400).json({error: error.message});
    }
};

const remove = async (req, res, next) => {
    try {
        let user = req.user;
        console.log(user);
        

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        let deletedUser = await user.deleteOne();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (error) {
        console.log('Error in remove controller: ', error.message)
        return res.status(400).json({
            error: error.message
        });
        
    }
};

export default { create, list, userByID, retrive, update, remove};
