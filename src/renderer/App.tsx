import 'material-symbols/rounded.css';
import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { createDataSource } from './fact/data-sources/catfacts.ninja';
import FactView from './FactView/FactView';
import FavoritesView from './FavouritesView/FavouritesView';
import './App.css';

export default function App() {
  const dataSource = useMemo(createDataSource, []);
  const currentFact = useAsync(dataSource, []);

  const [isFavorite, setFavorite] = useState(false);

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <FactView
              fact={currentFact}
              onDismiss={() => {
                currentFact.execute();
                setFavorite(false);
              }}
              isFavorite={isFavorite}
              onFavorite={() => setFavorite((val) => !val)}
            />
          }
        />
        <Route path="/favorites" element={<FavoritesView />} />
      </Routes>
    </Router>
  );
}
