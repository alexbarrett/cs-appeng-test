export interface Fact {
  source: string;
  id: string;
  text: string;
  updatedAt: string;
}

export const isFact = (value: any): value is Fact =>
  typeof value === 'object' &&
  ['source', 'id', 'text', 'updatedAt'].every(
    (property) => typeof value[property] === 'string',
  );

export type FactDataSource = () => Promise<Fact>;
