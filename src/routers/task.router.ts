import express from 'express';


import taskCtrl from '../controllers/task.controller';
import authCtrl from '../controllers/auth.controller';


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

router.route('/tasks/:taskId/users/:userId')
    .get(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        taskCtrl.retrieve
    )
    .put(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        taskCtrl.update
    )
    .delete(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        taskCtrl.remove
    )


router.param("taskId", taskCtrl.retrieveTaskByID);

export default router;
