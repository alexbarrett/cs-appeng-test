/* eslint-disable import/prefer-default-export */
import { FactDataSource } from '../Fact';

const DATA_SOURCE_NAME = 'catfacts.nina';
const BASE_URL = 'https://catfact.ninja';

export const createDataSource = (): FactDataSource => {
  const url = `${BASE_URL}/fact`;

  return async () => {
    const response = await fetch(url);
    const body = await response.json();

    if (!body || typeof body.fact !== 'string') {
      throw new Error(`Invalid fact loaded from ${url}`);
    }

    return {
      text: body.fact as string,
      updatedAt: new Date().toISOString(),
      source: DATA_SOURCE_NAME,
    };
  };
};
