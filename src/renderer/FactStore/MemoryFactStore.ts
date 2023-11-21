import { Fact } from '../fact/Fact';
import { FactStore } from './FactStore';

const key = (fact: Fact) => `${fact.source}__${fact.id}`;

/**
 * Defaults to using localStorage.
 */
class MemoryFactStore implements FactStore {
  private facts = new Map();

  async add(fact: Fact) {
    this.facts.set(key(fact), fact);
  }

  async remove(fact: Fact) {
    this.facts.delete(key(fact));
  }

  async contains(fact: Fact) {
    return this.facts.has(key(fact));
  }

  async getAll() {
    return [...this.facts.values()];
  }
}

export default MemoryFactStore;
