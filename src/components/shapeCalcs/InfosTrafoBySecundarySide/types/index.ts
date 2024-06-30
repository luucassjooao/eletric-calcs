export type TypePotency = 'Watts' | 'CV' | 'HP' | 'VA' | '';

export interface ICircuit {
  id: string;
  typePotency: TypePotency;
  valuePotency: number;
  illustrationCalcPotency: string;
  usageVolts: number;
  threePhase: boolean;
  fp: number;
  efficiency: number;
  name: string;
  quantity: number;

  calcsValues?: {
    current: {
      value: string;
      illustration: string;
    }
    CosDegrees: {
      value: string;
      illustration: string;
    };
    horizontalCurrent: {
      value: string;
      illustration: string;
    };
    verticalCurrent: {
      value: string;
      illustration: string;
    };
  }
}

interface ITypeSums<T> {
  value: string;
  illustration: T | string;
}

export interface ISumsValueAndIllustration {
  horizontalCurrent: ITypeSums<string[]>;
  verticalCurrent: ITypeSums<string[]>;
  totalCurrentSecundary: ITypeSums<string>;
  tanTotalCurrentLineSecundary: ITypeSums<string>;
  tensionPhaseSecundary: ITypeSums<string>;
  tensionPhasePrimary: ITypeSums<string>;
  currentLinePrimary: ITypeSums<string>;
  apparentPotencyS: ITypeSums<string>;
  activePotencyP: ITypeSums<string>;
  reactivePotencyQ: ITypeSums<string>;
  FPSystem: ITypeSums<string>;
  tanDegreeCurrentSecundary: string;
}
