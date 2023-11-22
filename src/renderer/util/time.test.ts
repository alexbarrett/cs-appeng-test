import { milliseconds } from './time';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = 1000 * 60 * 60;

describe('milliseconds', () => {
  it('handles a combination of milliseconds and seconds', () => {
    expect(milliseconds({ millisecond: 500, second: 5 })).toBe(
      500 + MS_PER_SECOND * 5,
    );
  });

  it('handles a combination of seconds and minutes', () => {
    expect(milliseconds({ second: 5, minute: 3 })).toBe(
      MS_PER_SECOND * 5 + MS_PER_MINUTE * 3,
    );
  });

  it('handles a combination of minutes and hours', () => {
    expect(milliseconds({ minute: 3, hour: 2 })).toBe(
      MS_PER_MINUTE * 3 + MS_PER_HOUR * 2,
    );
  });

  it('handles a combination of every supported time unit', () => {
    expect(
      milliseconds({ millisecond: 500, second: 5, minute: 3, hour: 2 }),
    ).toBe(500 + MS_PER_SECOND * 5 + MS_PER_MINUTE * 3 + MS_PER_HOUR * 2);
  });

  it('defaults to zero', () => {
    expect(milliseconds({})).toBe(0);
  });
});
