import React from 'react';
import type { Book } from '../types/book';

interface Props {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onToggle: (book: Book) => void;
}

const BookCard: React.FC<Props> = ({ book, onEdit, onDelete, onToggle }) => {
  return (
    <div className={`book-card ${book.available ? 'available' : 'unavailable'}`}>
      <div className="book-badge">{book.available ? '✅ Available' : '🔴 Borrowed'}</div>
      <div className="book-icon">📖</div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      {book.publishedYear && (
        <p className="book-meta">📅 {book.publishedYear}</p>
      )}
      {book.isbn && (
        <p className="book-meta">🔢 {book.isbn}</p>
      )}
      <div className="book-actions">
        <button className="btn-edit" onClick={() => onEdit(book)}>✏️ Edit</button>
        <button
          className={book.available ? 'btn-borrow' : 'btn-return'}
          onClick={() => onToggle(book)}
        >
          {book.available ? '📤 Borrow' : '📥 Return'}
        </button>
        <button className="btn-delete" onClick={() => onDelete(book._id!)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
