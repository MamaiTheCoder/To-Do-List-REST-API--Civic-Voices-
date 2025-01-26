import express from 'express';

import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/login')
    .post(authCtrl.signin);

router.route('/auth/signout')
    .get(authCtrl.signout);

export default router;
