export interface Fact {
  text: string;
  updatedAt: string;
  source: string;
}

export type FactDataSource = () => Promise<Fact>;
