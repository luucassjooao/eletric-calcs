import { TypePotency } from '@/app/types/globalTypes';

export const objIllustrationString: Record<TypePotency, (value: string) => string> = {
  'Watts': (value: string) => `${value}W`,
  'CV': (value: string) => `(${value}x736)W`,
  'HP': (value: string) => `(${value}x1,1014x736)W`,
  'VA': (value: string) => `${value}VA`,
  '': () => ''
};
