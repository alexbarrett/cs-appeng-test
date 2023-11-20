import fetchMock from 'jest-fetch-mock';
import { TextDecoder, TextEncoder } from 'util';
import { webcrypto } from 'crypto';

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-ignore
global.crypto.subtle = webcrypto.subtle;

fetchMock.enableMocks();
