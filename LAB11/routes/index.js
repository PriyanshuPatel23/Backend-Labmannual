const express = require('express');
const faculty = require('./faculty')
const product = require('./product')
const student = require('./student')
const router = express.Router();

router.use('/faculty', require('./faculty'))
router.use('/student', require('./student'))
router.use('/product', require('./product'))

module.exports = router;