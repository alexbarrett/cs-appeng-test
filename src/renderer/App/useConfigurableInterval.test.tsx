import { act, fireEvent, render, screen } from '@testing-library/react';

import {
  useConfigurableInterval,
  DISABLED_INTERVAL_VALUE,
} from './useConfigurableInterval';

describe('useConfigurableInterval', () => {
  const mockHandler = jest.fn();
  const testIntervalOptions = [
    { label: '10 seconds', intervalMs: 10000 },
    { label: '1 minute', intervalMs: 60000 },
    { label: 'Never', intervalMs: DISABLED_INTERVAL_VALUE },
  ] as const;

  function TestComponent({
    defaultOption,
  }: {
    defaultOption: (typeof testIntervalOptions)[number]['label'];
  }) {
    return useConfigurableInterval(
      testIntervalOptions,
      defaultOption,
      mockHandler,
    );
  }

  beforeEach(() => {
    mockHandler.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('initializes with the correct default interval', () => {
    render(<TestComponent defaultOption="1 minute" />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('60000');

    jest.advanceTimersByTime(120000);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('changes the interval when reconfigured', () => {
    render(<TestComponent defaultOption="1 minute" />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    act(() => {
      fireEvent.change(select, { target: { value: '10000' } });
    });
    expect(select.value).toBe('10000');

    jest.advanceTimersByTime(60000);
    expect(mockHandler).toHaveBeenCalledTimes(6);
  });

  it('does not execute the callback when disabled', () => {
    render(<TestComponent defaultOption="1 minute" />);

    act(() => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: String(DISABLED_INTERVAL_VALUE) },
      });
    });

    jest.advanceTimersByTime(120000);
    expect(mockHandler).toHaveBeenCalledTimes(0);
  });
});
