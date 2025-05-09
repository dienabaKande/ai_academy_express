import React, { useState } from 'react';
import './Counter.css';

const Counter = ({ initialValue = 0, label }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter">
      <h3>{label}</h3>
      <p>{count}</p>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
};

export default Counter;