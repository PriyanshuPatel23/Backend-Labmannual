import React, { useEffect, useState } from 'react';
import type { Book } from './types/book';
import { fetchBooks, createBook, updateBook, deleteBook } from './api/bookApi';
import BookForm from './components/BookForm';
import './App.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const loadBooks = async () => {
    try {
      setLoading(true);
      const res = await fetchBooks();
      setBooks(res.data);
      setError('');
    } catch {
      setError('Failed to connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBooks(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAdd = async (data: Omit<Book, '_id'>) => {
    await createBook(data);
    setShowForm(false);
    loadBooks();
    showToast('Book added successfully!');
  };

  const handleEdit = async (data: Omit<Book, '_id'>) => {
    if (!editBook?._id) return;
    await updateBook(editBook._id, data);
    setEditBook(null);
    setShowForm(false);
    loadBooks();
    showToast('Book updated successfully!');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    await deleteBook(id);
    loadBooks();
    showToast('Book deleted.');
  };

  const handleToggle = async (book: Book) => {
    await updateBook(book._id!, { available: !book.available });
    loadBooks();
    showToast(book.available ? 'Book marked as borrowed.' : 'Book returned!');
  };

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'available' && b.available) ||
      (filter === 'borrowed' && !b.available);
    return matchSearch && matchFilter;
  });

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      <h1>Library Management System</h1>
      <p className="subtitle">Lab 12 — MERN Stack (MongoDB, Express, React, Node.js)</p>

      <div className="stats">
        <div className="stat-card">
          <strong>{books.length}</strong>Total Books
        </div>
        <div className="stat-card">
          <strong>{books.filter(b => b.available).length}</strong>Available
        </div>
        <div className="stat-card">
          <strong>{books.filter(b => !b.available).length}</strong>Borrowed
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Books</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
        <button
          className="btn-add"
          onClick={() => { setEditBook(null); setShowForm(true); }}
        >
          + Add Book
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading books...</p>
      ) : error ? (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={loadBooks}>Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <p className="empty">
          {books.length === 0 ? 'No books found. Click "+ Add Book" to get started.' : 'No books match your search.'}
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>ISBN</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book, i) => (
                <tr key={book._id}>
                  <td>{i + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishedYear ?? '—'}</td>
                  <td>{book.isbn || '—'}</td>
                  <td>
                    <span className={book.available ? 'badge badge-yes' : 'badge badge-no'}>
                      {book.available ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => { setEditBook(book); setShowForm(true); }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-toggle"
                        onClick={() => handleToggle(book)}
                      >
                        {book.available ? 'Borrow' : 'Return'}
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(book._id!)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <BookForm
          initial={editBook}
          onSubmit={editBook ? handleEdit : handleAdd}
          onClose={() => { setShowForm(false); setEditBook(null); }}
        />
      )}
    </div>
  );
};

export default App;
