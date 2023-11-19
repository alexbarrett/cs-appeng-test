import { useMemo } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { createDataSource } from './fact/data-sources/catfacts.ninja';
import FactView from './FactView/FactView';
import './App.css';

export default function App() {
  const dataSource = useMemo(createDataSource, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FactView dataSource={dataSource} />} />
      </Routes>
    </Router>
  );
}
