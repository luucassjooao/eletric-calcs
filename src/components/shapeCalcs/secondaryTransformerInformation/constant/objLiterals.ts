import { TypePotency } from '..';

export const objRealSum: Record<TypePotency, (value: number) => number> = {
  'Watts': (value: number) => value,
  'CV': (value: number) => value*736,
  'HP': (value: number) => value*1.014*736,
  'VA': (value: number) => value,
  '': () => 0
};
export const objIllustrationString: Record<TypePotency, (value: string) => string> = {
  'Watts': (value: string) => `${value}W`,
  'CV': (value: string) => `(${value}x736)W`,
  'HP': (value: string) => `(${value}x1,1014x736)W`,
  'VA': (value: string) => `${value}VA`,
  '': () => ''
};
