import express from 'express';


import userCrtl from '../controllers/user.controller.js';


const router = express.Router();

router.route('/users')
    .post(userCrtl.create)
    .get(userCrtl.list);


router.route('/users/:userId')
    .get(userCrtl.retrive)
    .put(userCrtl.update)
    .delete(userCrtl.remove);


router.param("userId", userCrtl.userByID);

export default router;
