import 'material-symbols/rounded.css';
import { useCallback, useState } from 'react';
import { useAsync } from 'react-async-hook';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import { createDataSource } from '../fact/data-sources/catfacts.ninja';
import BrowserFactStore from '../FactStore/BrowserFactStore';
import FactView from '../FactView/FactView';
import FavoritesView from '../FavoritesView/FavoritesView';
import { milliseconds } from '../util/time';
import {
  DISABLED_INTERVAL_VALUE,
  useConfigurableInterval,
} from './useConfigurableInterval';
import './App.css';

export default function App() {
  const [dataSource] = useState(createDataSource);
  const [favorites] = useState(() => new BrowserFactStore());
  const currentFact = useAsync(dataSource, [dataSource]);

  const isFavorite = useAsync(async () => {
    if (!currentFact.result) {
      return false;
    }
    return favorites.contains(currentFact.result);
  }, [favorites, currentFact.result]);

  const [isTogglingFavorite, setTogglingFavorite] = useState(false);
  const handleAddFavorite = async () => {
    if (
      !currentFact.result ||
      isFavorite.status !== 'success' ||
      isTogglingFavorite
    ) {
      // Prevent toggling if FactView is not fully loaded or if toggling is
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

  const notificationIntervalOptions = [
    { label: 'every 10 seconds', intervalMs: milliseconds({ second: 10 }) },
    { label: 'every 5 minutes', intervalMs: milliseconds({ minute: 5 }) },
    { label: 'every 2 hours', intervalMs: milliseconds({ hour: 2 }) },
    { label: 'never', intervalMs: DISABLED_INTERVAL_VALUE },
  ] as const;

  const handleNotificationTriggered = useCallback(async () => {
    const fact = await currentFact.execute();
    window.electron.ipcRenderer.showNotification(
      'Cat Facts for (Cyber)Smart People',
      fact.text,
    );
  }, [currentFact]);

  const notificationSelectElement = useConfigurableInterval(
    notificationIntervalOptions,
    'every 5 minutes',
    handleNotificationTriggered,
  );

  return (
    <Router>
      <header>
        <nav>
          <ol>
            <li>
              <NavLink to="/">
                <span className="material-symbols-rounded">explore</span>{' '}
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">
                <span className="material-symbols-rounded">favorite</span>{' '}
                Favourites
              </NavLink>
            </li>
          </ol>
        </nav>
        <div>Notify me about new cat facts {notificationSelectElement}</div>
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
