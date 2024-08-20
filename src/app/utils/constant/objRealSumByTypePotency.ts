import { TypePotency } from '@/app/types/globalTypes';

export const objRealSumByTypePotency: Record<TypePotency, (value: number) => number> = {
  'Watts': (value: number) => value,
  'CV': (value: number) => value*736,
  'HP': (value: number) => value*1.014*736,
  'VA': (value: number) => value,
  '': () => 0
};
