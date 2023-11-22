import { ChangeEventHandler, ReactElement, useEffect, useState } from 'react';

export const DISABLED_INTERVAL_VALUE = 0;

/**
 * Creates a select element that controls a periodic callback.
 *
 * This hook handles the internal state of the select element as well as
 * triggering the provided callback function each time the interval period
 * elapses. The interval is reset each time the interval is changed.
 *
 * @param options
 *   An array of objects representing interval options.
 * @param defaultOptionLabel
 *   The label of the interval option that should be the default.
 * @param onIntervalTriggered
 *   A callback function to be executed at the interval configured by the
 *   select element.
 * @returns
 *   A select element to control the exection of the interval handler.
 */
export const useConfigurableInterval = <
  TOptions extends ReadonlyArray<{ label: string; intervalMs: number }>,
>(
  options: TOptions,
  defaultOptionLabel: TOptions[number]['label'],
  onIntervalTriggered: () => void,
): ReactElement => {
  const [configurableIntervalMs, setConfigurableIntervalMs] = useState(
    () =>
      options.find(({ label }) => label === defaultOptionLabel)?.intervalMs ??
      DISABLED_INTERVAL_VALUE,
  );
  const handleIntervalChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setConfigurableIntervalMs(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    let handle: ReturnType<typeof setInterval> | undefined;
    if (configurableIntervalMs !== DISABLED_INTERVAL_VALUE) {
      handle = setInterval(onIntervalTriggered, configurableIntervalMs);
    }

    return () => {
      clearTimeout(handle);
    };
  }, [configurableIntervalMs, onIntervalTriggered]);

  const selectElement = (
    <select onChange={handleIntervalChange} value={configurableIntervalMs}>
      {options.map(({ label, intervalMs }) => (
        <option key={label} value={intervalMs}>
          {label}
        </option>
      ))}
    </select>
  );

  return selectElement;
};
