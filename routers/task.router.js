import express from 'express';


import taskCtrl from '../controllers/task.controller.js';
import authCtrl from '../controllers/auth.controller.js';


const router = express.Router();

router.route('/tasks/new/:userId')
    .post(
        authCtrl.requireSignin,
        taskCtrl.create
    )

router.route('/tasks/by/:userId')
    .get(
        authCtrl.requireSignin,
        taskCtrl.listByUser
    )

router.route('/tasks/:taskId/user/:userId')
    .get(
        authCtrl.requireSignin,
        taskCtrl.retrieve
    )
    .put(
        authCtrl.requireSignin,
        taskCtrl.update
    )
    .delete(
        authCtrl.requireSignin,
        taskCtrl.remove
    )



router.param("taskId", taskCtrl.retrieveTaskByID);

export default router;
