import { Router } from "express";
const router = Router();

import * as controller from '../controller/controller.js'

router.route('/questions')
    .get(controller.getQuestions)
    .post(controller.insertQuestions)
    .delete(controller.dropQuestions)

router.route('/result')
    .get(controller.getResult)
    .post(controller.insertResult)
    .delete(controller.dropResult)

export default router;