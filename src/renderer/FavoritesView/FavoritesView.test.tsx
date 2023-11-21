import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { FactStore } from '../FactStore/FactStore';
import MemoryFactStore from '../FactStore/MemoryFactStore';
import FavoritesView from './FavoritesView';

const LOADING_SYMBOL = 'progress_activity';

const facts = [
  {
    id: '1',
    text: 'At 4 weeks, it is important to play with kittens so that they do not develope a fear of people.',
    updatedAt: '2023-11-20T17:24:00Z',
    source: 'fixture',
  },
  {
    id: '2',
    text: 'Kittens remain with their mother till the age of 9 weeks.',
    updatedAt: '2023-11-20T17:24:30Z',
    source: 'fixture',
  },
] as const;

describe('FavoritesView', () => {
  let factStore: FactStore;
  beforeEach(() => {
    factStore = new MemoryFactStore();
    facts.forEach((fact) => factStore.add(fact));
  });

  it('displays all favorited facts', async () => {
    render(<FavoritesView factStore={factStore} />);
    await waitForElementToBeRemoved(screen.queryByText(LOADING_SYMBOL));

    expect(screen.getAllByRole('button', { name: 'heart_minus' })).toHaveLength(
      facts.length,
    );
  });

  it('removes a fact from the fact store when removed from favorites', async () => {
    render(<FavoritesView factStore={factStore} />);
    await waitForElementToBeRemoved(screen.queryByText(LOADING_SYMBOL));
    await act(async () => {
      fireEvent.click(
        screen.getAllByRole('button', { name: 'heart_minus' })[0],
      );
    });

    await expect(factStore.getAll()).resolves.toHaveLength(1);
  });
});
