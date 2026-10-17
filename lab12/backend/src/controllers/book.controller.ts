import Book, { IBook } from '../models/book.model';
import { Request, Response } from 'express';

export const getAll = async (_: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
};

export const getOne = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  book ? res.json(book) : res.status(404).json({ msg: 'Not found' });
};

export const create = async (req: Request, res: Response) => {
  const newBook = new Book({ ...req.body, available: true });
  const saved = await newBook.save();
  res.status(201).json(saved);
};

export const update = async (req: Request, res: Response) => {
  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updated ? res.json(updated) : res.status(404).json({ msg: 'Not found' });
};

export const remove = async (req: Request, res: Response) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  deleted ? res.json({ success: true }) : res.status(404).json({ msg: 'Not found' });
};