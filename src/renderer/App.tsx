import 'material-symbols/rounded.css';
import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { createDataSource } from './fact/data-sources/catfacts.ninja';
import FactView from './FactView/FactView';
import './App.css';

export default function App() {
  const dataSource = useMemo(createDataSource, []);
  const currentFact = useAsync(dataSource, []);

  const [isFavorite, setFavorite] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FactView
              fact={currentFact}
              isFavorite={isFavorite}
              onFavorite={() => setFavorite((val) => !val)}
            />
          }
        />
      </Routes>
    </Router>
  );
}
