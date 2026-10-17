import axios from 'axios';
import type { Book } from '../types/book';

const BASE_URL = 'http://localhost:5000/api/books';

export const fetchBooks = () => axios.get<Book[]>(BASE_URL);
export const fetchBook = (id: string) => axios.get<Book>(`${BASE_URL}/${id}`);
export const createBook = (data: Omit<Book, '_id'>) => axios.post<Book>(BASE_URL, data);
export const updateBook = (id: string, data: Partial<Book>) => axios.put<Book>(`${BASE_URL}/${id}`, data);
export const deleteBook = (id: string) => axios.delete(`${BASE_URL}/${id}`);
