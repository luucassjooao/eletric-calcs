export type TypePotency = 'Watts' | 'CV' | 'HP' | 'VA' | '';

export interface ICircuit<T> {
  id: string;
  typePotency: TypePotency;
  valuePotency: number;
  illustrationCalcPotency: string;
  fp: number;
  efficiency: number;
  name: string;
  quantity: number;
  usageVolts?: number;
  threePhase?: boolean;

  calcsValues?: T;
}
