/* eslint-disable import/prefer-default-export */
import { FactDataSource } from '../Fact';

const DATA_SOURCE_NAME = 'catfacts.nina';
const BASE_URL = 'https://catfact.ninja';

/**
 * The catfacts.ninja API does not return anything that can be used an ID for
 * a given fact. The text content of the fact is instead used as the ID by means
 * of a hash function represented as Base64.
 */
const hash = async (text: string): Promise<string> => {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-1', data);
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

export const createDataSource = (): FactDataSource => {
  const url = `${BASE_URL}/fact`;

  return async () => {
    const response = await fetch(url);
    const body = await response.json();

    if (!body || typeof body.fact !== 'string') {
      throw new Error(`Invalid fact loaded from ${url}`);
    }

    return {
      source: DATA_SOURCE_NAME,
      id: await hash(body.fact),
      text: body.fact as string,
      updatedAt: new Date().toISOString(),
    };
  };
};
