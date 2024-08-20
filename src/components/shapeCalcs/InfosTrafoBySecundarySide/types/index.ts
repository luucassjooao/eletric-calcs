import { ITypeSums } from '@/app/types/globalTypes';

export interface ICalcsValues {
  current: ITypeSums<string>;
  CosDegrees: ITypeSums<string>;
  horizontalCurrent: ITypeSums<string>;
  verticalCurrent: ITypeSums<string>;
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
