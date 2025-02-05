import express from 'express';


import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/users')
    .post(userCtrl.create)
    .get(userCtrl.list);

router.route('/users/:userId')
    .get(
        authCtrl.requireSignin,
        userCtrl.read
    )
    .put(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        userCtrl.update
    )
    .delete(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        userCtrl.remove
    );


router.param("userId", userCtrl.userByID);

export default router;
