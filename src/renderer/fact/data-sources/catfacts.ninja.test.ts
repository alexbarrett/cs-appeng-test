import fetchMock from 'jest-fetch-mock';

import { FactDataSource } from '../Fact';
import { createDataSource } from './catfacts.ninja';

describe('data source', () => {
  let loadFact: FactDataSource;

  beforeAll(() => {
    loadFact = createDataSource();

    fetchMock.mockResponse(
      JSON.stringify({
        fact: 'Researchers believe the word “tabby” comes from Attabiyah, a neighborhood in Baghdad, Iraq. Tabbies got their name because their striped coats resembled the famous wavy patterns in the silk produced in this city.',
        length: 212,
      }),
    );
  });

  it('is able to parse a valid response from the API', async () => {
    const fact = await loadFact();
    expect(fact).toMatchObject({
      text: expect.stringContaining('tabby'),
      updatedAt: expect.stringMatching(/^[\d-]+T[\d:]+/), // ISO timestamp-ish.
      source: expect.any(String),
    });
  });

  it('generates an ID from the fact text', async () => {
    const fact = await loadFact();
    expect(fact.id).toMatchSnapshot(); // Unable to use inline snapshots with Prettier v3 yet.
  });
});
