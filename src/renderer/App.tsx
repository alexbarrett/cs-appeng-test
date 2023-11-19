import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import FactView from './FactView/FactView';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FactView />} />
      </Routes>
    </Router>
  );
}
