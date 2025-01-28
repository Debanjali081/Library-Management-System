import React, { useState } from 'react';

const MembershipForm = ({ onSubmit, initialData = {} }) => {
  const [userId, setUserId] = useState(initialData.userId || '');
  const [duration, setDuration] = useState(initialData.duration || '6 months');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userId, duration });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User ID:</label>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      <label>Duration:</label>
      <select value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="6 months">6 months</option>
        <option value="1 year">1 year</option>
        <option value="2 years">2 years</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MembershipForm;