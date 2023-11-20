import BrowserFactStore from './BrowserFactStore';
import { FactStore } from './FactStore';

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

describe('BrowserFactStore', () => {
  let factStore: FactStore;

  beforeEach(() => {
    localStorage.clear();
    factStore = new BrowserFactStore();
  });

  it('contains a fact after it is added', async () => {
    await expect(factStore.getAll()).resolves.toHaveLength(0);
    factStore.add(facts[0]);
    await expect(factStore.getAll()).resolves.toHaveLength(1);
  });

  it('still contains a fact when further facts are added', async () => {
    factStore.add(facts[0]);
    factStore.add(facts[1]);
    await expect(factStore.contains(facts[0])).resolves.toBe(true);
  });

  it('deserialises a stored fact so that it matches the original fact', async () => {
    factStore.add(facts[0]);
    await expect(factStore.getAll()).resolves.toEqual([facts[0]]);
  });

  it('no longer contains a fact once it is removed', async () => {
    factStore.add(facts[0]);
    factStore.add(facts[1]);
    factStore.remove(facts[0]);
    await expect(factStore.contains(facts[1])).resolves.toBe(true);
  });
});
