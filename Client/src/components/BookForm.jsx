import React, { useState } from 'react';

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Author:</label>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;