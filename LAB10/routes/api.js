const express = require('express');
const router = express.Router();

const Faculty  = require('../models/faculty');
const Student  = require('../models/student');
const Product  = require('../models/product');

router.get('/faculty', async (req, res, next) => {
  try {
    const list = await Faculty.find();
    res.json(list);
  } catch (e) { next(e); }
});

router.post('/faculty', async (req, res, next) => {
  try {
    const doc = await Faculty.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

router.get('/student', async (req, res, next) => {
  try {
    const list = await Student.find();
    res.json(list);
  } catch (e) { next(e); }
});

router.post('/student', async (req, res, next) => {
  try {
    const doc = await Student.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

router.get('/product', async (req, res, next) => {
  try {
    const list = await Product.find();
    res.json(list);
  } catch (e) { next(e); }
});

router.post('/product', async (req, res, next) => {
  try {
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

module.exports = router;