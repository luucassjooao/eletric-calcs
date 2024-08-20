import { ITypeSums } from '@/app/types/globalTypes';

export interface ICalcsValues {
  Pmec: ITypeSums<string, number>;
  Pele: ITypeSums<string, number>;
  arccos: ITypeSums<string, number>;
  PCapacitive: ITypeSums<string, number>;
  QReactive: ITypeSums<string, number>;
}

export interface ISumsValueAndIllustration {
    thetaGeral: ITypeSums<string>;
    CosThetaGeral: ITypeSums<string>;
    tgThetaNew: string;
    tgNotFininshed: string;
    Qnew: ITypeSums<string>;
    Qcapacitive: ITypeSums<string>;
    potencyCapacitivePerPhase: ITypeSums<string>;
    Xc: ITypeSums<string>;
    Capacitor: ITypeSums<string>;
    tensionForCapacitor: ITypeSums<string>;
}
