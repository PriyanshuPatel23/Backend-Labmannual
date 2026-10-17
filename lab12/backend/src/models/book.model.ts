import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear?: number;
  isbn?: string;
  available: boolean;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: Number,
  isbn: String,
  available: { type: Boolean, default: true },
});

export default model<IBook>('Book', BookSchema);