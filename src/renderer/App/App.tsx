import 'material-symbols/rounded.css';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { createDataSource } from '../fact/data-sources/catfacts.ninja';
import BrowserFactStore from '../FactStore/BrowserFactStore';
import FactView from '../FactView/FactView';
import FavoritesView from '../FavoritesView/FavoritesView';
import './App.css';

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

  const [isTogglingFavorite, setTogglingFavorite] = useState(false);
  const handleAddFavorite = async () => {
    if (
      !currentFact.result ||
      isFavorite.status !== 'success' ||
      isTogglingFavorite
    ) {
      // Only allow toggling when FactView is fully loaded, and toggling is not
      // already in progress.
      return;
    }

    setTogglingFavorite(true);
    if (isFavorite.result) {
      await favorites.remove(currentFact.result);
      await isFavorite.execute();
      setTogglingFavorite(false);
    } else {
      await favorites.add(currentFact.result);
      await isFavorite.execute();
      setTimeout(() => {
        currentFact.execute();
        setTogglingFavorite(false);
      }, 200);
    }
  };

  return (
    <Router>
      <header>
        <nav>
          <ol>
            <li>
              <Link to="/">Explore</Link>
            </li>
            <li>
              <Link to="/favorites">Favourites</Link>
            </li>
          </ol>
        </nav>
        <div>
          Notify me about a new cat fact every{' '}
          <select>
            <option>10 seconds</option>
            <option>5 minutes</option>
            <option>2 hours</option>
          </select>
        </div>
      </header>
      <main>
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
                onFavorite={handleAddFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={<FavoritesView factStore={favorites} />}
          />
        </Routes>
      </main>
    </Router>
  );
}
