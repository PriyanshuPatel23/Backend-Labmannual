// PART C
const express = require('express');
const router  = express.Router();
const Product = require('../models/product');
const asyncHandler = require('./asyncWrapper');

router.get('/', asyncHandler(async (req, res) => {
  const list = await Product.find();
  res.json(list);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}));

router.post('/', asyncHandler(async (req, res) => {
  const created = await Product.create(req.body);
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const updated = await Product.findOneAndReplace(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}));

module.exports = router;
