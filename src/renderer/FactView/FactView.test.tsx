import { AsyncState } from 'react-async-hook';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Fact } from '../fact/Fact';
import FactView from './FactView';

// type AsyncStateStatus = 'not-requested' | 'loading' | 'success' | 'error';
// type AsyncState<R> = {
//   status: AsyncStateStatus;
//   loading: boolean;
//   error: Error | undefined;
//   result: R | undefined;
// };

const LOADING_SYMBOL = 'progress_activity';

const fact: Fact = {
  id: '1',
  text: 'Purring does not always indicate that a cat is happy. Cats will also purr loudly when they are distressed or in pain.',
  updatedAt: '2023-11-20T15:22:00Z',
  source: 'fixture',
};

const factLoading: AsyncState<Fact> = {
  status: 'loading',
  loading: true,
  error: undefined,
  result: undefined,
};

const factSuccess: AsyncState<Fact> = {
  status: 'success',
  loading: false,
  error: undefined,
  result: fact,
};

const factError: AsyncState<Fact> = {
  status: 'error',
  loading: false,
  error: Error('This error is part of a test fixture.'),
  result: undefined,
};

describe('FactView', () => {
  it('displays a loading animation before a fact is loaded', () => {
    render(<FactView fact={factLoading} />);
    expect(screen.getByText(LOADING_SYMBOL)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'close' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'favorite' })).toBeDisabled();
  });

  it('renders a loaded fact', () => {
    render(<FactView fact={factSuccess} />);
    expect(screen.getByText('cat is happy', { exact: false })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'close' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'favorite' })).toBeEnabled();
  });

  it('renders an error message if loading of a fact failed', () => {
    render(<FactView fact={factError} />);
    expect(
      screen.getByText('A problem was encountered', { exact: false }),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'close' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'favorite' })).toBeDisabled();
  });
});
