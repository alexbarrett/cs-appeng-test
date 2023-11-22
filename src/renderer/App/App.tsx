import 'material-symbols/rounded.css';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { createDataSource } from '../fact/data-sources/catfacts.ninja';
import BrowserFactStore from '../FactStore/BrowserFactStore';
import FactView from '../FactView/FactView';
import FavoritesView from '../FavoritesView/FavoritesView';
import './App.css';
import { milliseconds } from '../util/time';

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
    { label: '10 seconds', intervalMs: milliseconds({ second: 10 }) },
    { label: '5 minutes', intervalMs: milliseconds({ minute: 5 }) },
    { label: '2 hours', intervalMs: milliseconds({ hour: 5 }) },
    { label: 'Never', intervalMs: null },
  ] as const;
  type NotificationIntervalOptionLabel =
    (typeof notificationIntervalOptions)[number]['label'];
  const defaultNotificationInterval: NotificationIntervalOptionLabel =
    '5 minutes';

  const [notificationIntervalMs, setNotificationIntervalMs] = useState(
    () =>
      notificationIntervalOptions.find(
        ({ label }) => label === defaultNotificationInterval,
      )?.intervalMs ?? null,
  );
  const handleNotificationIntervalChange: ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setNotificationIntervalMs(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    let handle: ReturnType<typeof setInterval> | undefined;
    if (notificationIntervalMs !== null) {
      handle = setInterval(async () => {
        const fact = await currentFact.execute();
        window.electron.ipcRenderer.showNotification('New Cat Fact', fact.text);
      }, notificationIntervalMs);
    }

    return () => {
      clearTimeout(handle);
    };
  }, [currentFact, notificationIntervalMs]);

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
          Notify me about new cat facts every{' '}
          <select
            onChange={handleNotificationIntervalChange}
            value={notificationIntervalMs}
          >
            {notificationIntervalOptions.map(({ label, intervalMs }) => (
              <option
                key={label}
                value={intervalMs}
                selected={notificationIntervalMs === intervalMs}
              >
                {label}
              </option>
            ))}
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
