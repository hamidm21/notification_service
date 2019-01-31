const express = require('express');
const router = express.Router();
const controller = require('../lib/controllers/email_controller');


// router.post('/fromContactUs', controller.fromcontactUs);

// router.post('/toPsychologist', controller.toPsychologist);

router.post('/toClient', controller.sendEmailToClient);


module.exports = router;