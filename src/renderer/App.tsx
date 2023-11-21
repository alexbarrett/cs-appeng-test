import 'material-symbols/rounded.css';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { createDataSource } from './fact/data-sources/catfacts.ninja';
import FactView from './FactView/FactView';
import FavoritesView from './FavoritesView/FavoritesView';
import './App.css';
import BrowserFactStore from './FactStore/BrowserFactStore';

export default function App() {
  const [dataSource] = useState(createDataSource);
  const [favorites] = useState(() => new BrowserFactStore());
  const currentFact = useAsync(dataSource, []);

  const isFavorite = useAsync(async () => {
    if (!currentFact.result) {
      return false;
    }
    return favorites.contains(currentFact.result);
  }, [currentFact.result?.id]);

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li>
          <Link to="/favorites">Favourites</Link>
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
              }}
              isFavorite={isFavorite}
              onFavorite={() => {
                if (!currentFact.result || isFavorite.status !== 'success') {
                  return;
                }

                if (isFavorite.result) {
                  favorites.remove(currentFact.result);
                } else {
                  favorites.add(currentFact.result);
                }
                isFavorite.execute();
              }}
            />
          }
        />
        <Route
          path="/favorites"
          element={<FavoritesView factStore={favorites} />}
        />
      </Routes>
    </Router>
  );
}
