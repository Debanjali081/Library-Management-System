import React, { useState } from 'react';

const IssueForm = ({ onSubmit }) => {
  const [book, setBook] = useState('');
  const [issueDate, setIssueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ book, issueDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Book:</label>
      <input type="text" value={book} onChange={(e) => setBook(e.target.value)} required />
      <label>Issue Date:</label>
      <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />
      <button type="submit">Issue</button>
    </form>
  );
};

export default IssueForm;