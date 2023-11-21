import { Fact, isFact } from '../fact/Fact';
import { FactStore } from './FactStore';

interface BrowserFactStoreOptions {
  storage?: Storage;
}

/**
 * Stores facts using an instance of browser `Storage` implementations (usually
 * be localStorage or sessionStorage).
 *
 * Defaults to using localStorage if not otherwise specified.
 */
class BrowserFactStore implements FactStore {
  private storage: Storage;

  constructor(options: BrowserFactStoreOptions = {}) {
    this.storage = options?.storage ?? localStorage;
  }

  async add(fact: Fact) {
    const key = BrowserFactStore.storageKey(fact);
    this.storage.setItem(key, JSON.stringify(fact));
  }

  async remove(fact: Fact) {
    const key = BrowserFactStore.storageKey(fact);
    this.storage.removeItem(key);
  }

  async contains(fact: Fact) {
    const key = BrowserFactStore.storageKey(fact);
    return this.storage.getItem(key) !== null;
  }

  async getAll() {
    const result = [] as Fact[];
    for (const key of Object.keys(this.storage)) {
      if (key.startsWith('fact_')) {
        const serialized = this.storage.getItem(key);
        if (serialized) {
          const value = JSON.parse(serialized);
          if (isFact(value)) {
            result.push(value);
          }
        }
      }
    }
    return result;
  }

  private static storageKey(fact: Fact) {
    return `fact_${fact.source}_${fact.id}`;
  }
}

export default BrowserFactStore;
