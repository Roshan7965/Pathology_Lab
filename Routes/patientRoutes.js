const express = require("express");
const router = express.Router();
const patientControllers = require("../Controllers/patient");

router.post('/post',patientControllers.postPatient);
router.get('/get/:id',patientControllers.getPatientById);
router.get('/getStatus/:statusFind',patientControllers.getPatientByStatus);
router.put('/:id',patientControllers.updatePatient)
router.get('/:id/testDetails',patientControllers.getpatientTestDetails)
router.delete('/:id',patientControllers.deletePatient)
module.exports = router;