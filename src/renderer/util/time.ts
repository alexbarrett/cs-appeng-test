const MS_PER_TIME_UNIT = {
  millisecond: 1,
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
} as const;

type TIME_UNIT = keyof typeof MS_PER_TIME_UNIT;

/**
 * Converts time units to milliseconds.
 *
 * Takes an object where keys represent time units (milliseconds, seconds,
 * minutes, hours) and their corresponding values represent the quantity of each
 * time unit. It returns the total time represented by these units in
 * milliseconds.
 *
 * @param units
 *   An object with units of time as keys and quantities of that unit as values.
 * @returns
 *   The total time in milliseconds represented by the input time units.
 *
 * @example
 * // returns 3661000
 * milliseconds({ minute: 61, second: 1 });
 *
 * @example
 * // returns 3000
 * milliseconds({ second: 3 });
 */
// eslint-disable-next-line import/prefer-default-export
export const milliseconds = (units: { [K in TIME_UNIT]?: number }): number =>
  Object.entries(units).reduce(
    (ms, [unit, quantity]) =>
      ms + MS_PER_TIME_UNIT[unit as TIME_UNIT] * quantity,
    0,
  );
