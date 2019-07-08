import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  async function fetchValues() {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }
  async function fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post('/api/values', {
      index
    });

    setIndex('');
  }

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  function renderCalculatedValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your index</label>
        <input id="index" type="text" value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderCalculatedValues()}
    </div>
  );
}

export default Fib;
