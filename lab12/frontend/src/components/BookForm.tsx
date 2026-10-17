import React, { useState, useEffect } from 'react';
import type { Book } from '../types/book';

interface Props {
  initial?: Book | null;
  onSubmit: (data: Omit<Book, '_id'>) => void;
  onClose: () => void;
}

const empty: Omit<Book, '_id'> = {
  title: '',
  author: '',
  publishedYear: undefined,
  isbn: '',
  available: true,
};

const BookForm: React.FC<Props> = ({ initial, onSubmit, onClose }) => {
  const [form, setForm] = useState<Omit<Book, '_id'>>(empty);

  useEffect(() => {
    if (initial) {
      const { _id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(empty);
    }
  }, [initial]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'publishedYear'
          ? value === '' ? undefined : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initial ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input type="text" name="title" value={form.title} onChange={handle} required />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input type="text" name="author" value={form.author} onChange={handle} required />
          </div>
          <div className="form-group">
            <label>Published Year</label>
            <input
              type="number"
              name="publishedYear"
              value={form.publishedYear ?? ''}
              onChange={handle}
              min={1000}
              max={new Date().getFullYear()}
            />
          </div>
          <div className="form-group">
            <label>ISBN</label>
            <input type="text" name="isbn" value={form.isbn ?? ''} onChange={handle} />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handle}
              />
              Available for borrowing
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {initial ? 'Update' : 'Add Book'}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
