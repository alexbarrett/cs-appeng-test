import { Fact } from '../fact/Fact';

export interface FactStore {
  add(fact: Fact): Promise<void>;
  remove(fact: Fact): Promise<void>;
  contains(fact: Fact): Promise<boolean>;
  getAll(): Promise<ReadonlyArray<Fact>>;
}
