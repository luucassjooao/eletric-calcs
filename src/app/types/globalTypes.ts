import { ChangeEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export type TypePotency = 'Watts' | 'CV' | 'HP' | 'VA' | '';

export interface ITypeSums<T, G = string> {
  value: G;
  illustration: T | string;
}
