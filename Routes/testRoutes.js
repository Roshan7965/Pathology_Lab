const express = require("express");
const router = express.Router();
const testControllers = require("../Controllers/test");
router.post('/post',testControllers.postTest);
router.get('/get',testControllers.getTest);
router.get('/getTest/:id',testControllers.getTestById);

module.exports = router;