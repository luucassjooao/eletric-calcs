import { useEffect, useState } from 'react';
import { ICalcsValues, ISumsValueAndIllustration } from './types';
import { formatNumber } from '@/app/utils/functions/formatNumber';
import { useStandardFuncsOnShapeCalcs } from '@/app/hooks/standardFuncsOnShapeCalcs';
import { objIllustrationString } from '@/app/utils/constant/objIllustrationString';

export function useCorrectingThePowerFactor() {
  const [sumsIllustrationAndValue, setSumsIllustrationAndValue] = useState<ISumsValueAndIllustration>({
    thetaGeral: {
      value: '',
      illustration: ''
    },
    CosThetaGeral: {
      value: '',
      illustration: ''
    },
    tgThetaNew: '',
    potencyCapacitivePerPhase: {
      value: '',
      illustration: ''
    },
    tgNotFininshed: '',
    Qnew: {
      value: '',
      illustration: ''
    },
    Qcapacitive: {
      value: '',
      illustration: ''
    },
    Xc: {
      value: '',
      illustration: ''
    },
    Capacitor: {
      value: '',
      illustration: ''
    },
    tensionForCapacitor: {
      value: '',
      illustration: ''
    },
  });

  const {
    handleUpdateEfficiencyOnBlur,
    handleUpdateEfficiencyOnChange,
    handleUpdateName,
    handleUpdateQuantity,
    handleUpdateTypePotency,
    handleUpdateValueFpOnBlur,
    handleUpdateValueFpOnChange,
    handleValuePotency,
    circuits,
    setCircuits,
    addNewCircuit,
    setAddNewCircuit,
    changeInfosCircuit,
    setChangeInfosCircuit,
    valueCVAndHP, setValueCVAndHP,
    tensionVfn, setTensionVfn,
    errors,
    getErrorMessageByFieldName,
  } = useStandardFuncsOnShapeCalcs<ICalcsValues>();

  useEffect(() => {
    const totalQreactive = circuits.reduce((acc, curr) => {
      console.log({acc, curr});
      return acc += (curr.quantity * Number(curr.calcsValues?.QReactive?.value));
    },0);
    console.log({totalQreactive});
    const totalPotencyReactive = circuits.reduce((acc, curr) => acc += (curr.quantity * Number(curr.calcsValues?.Pele?.value)), 0);

    const thetaGeral = Math.atan(-totalQreactive/totalPotencyReactive) * (180/Math.PI);
    const thetaGeralIllustrative = `θgeral = tg⁻¹(${formatNumber(totalQreactive)}/${totalPotencyReactive})`;

    const tanRadians = thetaGeral * (Math.PI/180);
    const CosThetaGeral = Math.cos(tanRadians);
    const CosThetaGeralIllustrative = `cos(-${formatNumber(thetaGeral)})`;

    const tgThetaNewIllustrative = `tgθnovo = Qnovo/P`;
    const tgNotFinishedIllustrative = `cos⁻¹(0.92)=-23,07 = tg(-23.07) = Qnovo/${formatNumber(totalPotencyReactive)}`;

    const Qnew = totalPotencyReactive*Math.tan((-23.07 * Math.PI / 180));
    const QnewIllustrative = `Qnovo = ${formatNumber(totalPotencyReactive)}xtg(-23.07)`;

    const Qcapacitive = Math.abs(totalQreactive - Qnew);
    const QcapacitiveIllustrative = `${formatNumber(totalQreactive)}${formatNumber(Qnew)}`;

    const potencyCapacitivePerPhase = +Qcapacitive/3;
    const potencyCapacitivePerPhaseIllustrative = `${formatNumber(Qcapacitive)}/3`;

    const Xc = Math.pow(tensionVfn, 2) / potencyCapacitivePerPhase;
    const XcIllustrative = `Xc = ${formatNumber(tensionVfn)}²/${formatNumber(potencyCapacitivePerPhase)}`;

    const Qcapacitors = 1 / (2*Math.PI*60*Xc);
    const QcapacitorsIllustrative = `1/(2*π*60*${formatNumber(Xc)})`;

    const tensionForCapacitor = tensionVfn*2.5;
    const tensionForCapacitorIllustrative = `(ligação em estrela) 2.5*${formatNumber(tensionForCapacitor)}`;

    setSumsIllustrationAndValue((prevState) => ({
      ...prevState,
      Capacitor: {
        value: formatNumber(Qcapacitors),
        illustration: QcapacitorsIllustrative
      },
      CosThetaGeral: {
        value: String(CosThetaGeral).slice(0, 4),
        illustration: CosThetaGeralIllustrative
      },
      Qcapacitive: {
        value: formatNumber(Qcapacitive),
        illustration: QcapacitiveIllustrative
      },
      potencyCapacitivePerPhase: {
        value: formatNumber(potencyCapacitivePerPhase),
        illustration: potencyCapacitivePerPhaseIllustrative
      },
      Qnew: {
        value: formatNumber(Qnew),
        illustration: QnewIllustrative
      },
      tensionForCapacitor: {
        value: formatNumber(tensionForCapacitor),
        illustration: tensionForCapacitorIllustrative
      },
      tgThetaNew: tgThetaNewIllustrative,
      tgNotFininshed: tgNotFinishedIllustrative,
      thetaGeral: {
        value: formatNumber(thetaGeral),
        illustration: thetaGeralIllustrative
      },
      Xc: {
        value: formatNumber(Xc),
        illustration: XcIllustrative
      }
    }));
  }, [circuits, tensionVfn]);

  function handleConfirmAddNewCircuit() {
    const isCVOrHP = changeInfosCircuit.typePotency === ('CV' || 'HP');
    const Pmec = isCVOrHP ? changeInfosCircuit.valuePotency : 0;
    const PmecIllustration = isCVOrHP ? `${valueCVAndHP}x736` : '';

    const Pele = isCVOrHP ? Pmec/changeInfosCircuit.efficiency : changeInfosCircuit.valuePotency;
    const PeleIllustration = isCVOrHP ?
      `${objIllustrationString[changeInfosCircuit.typePotency](String(changeInfosCircuit.valuePotency))}/${changeInfosCircuit.efficiency}`
      : (
        changeInfosCircuit.typePotency === 'VA' ? changeInfosCircuit.illustrationCalcPotency : `${changeInfosCircuit.valuePotency}`
      );

    const CosRadians = Math.acos(changeInfosCircuit.fp);
    const CosDegrees = CosRadians * (180/Math.PI);
    const CosDegreesIllustrative = `cos⁻¹(${String(changeInfosCircuit.fp).slice(0, 4)})`;

    const PCapacitive = Pele*changeInfosCircuit.quantity;
    const PCapacitiveIllustrative = `${formatNumber(Pele)}x${changeInfosCircuit.quantity}`;

    // colocar VAR no na visuzalição
    const Qreactive = Pele*Math.tan((-CosDegrees*Math.PI/180));
    const QreativeIllustrative = `${formatNumber(Pele)}xtg(-${formatNumber(CosDegrees)})`;

    const objInfoCircuit = {
      ...changeInfosCircuit,
      threePhase: false,
      usageVolts: 0,
      calcsValues: {
        Pmec: {
          value: Pmec,
          illustration: PmecIllustration
        },
        Pele: {
          value: Pele,
          illustration: PeleIllustration
        },
        arccos: {
          value: CosDegrees,
          illustration: CosDegreesIllustrative
        },
        PCapacitive: {
          value: PCapacitive,
          illustration: PCapacitiveIllustrative
        },
        QReactive: {
          value: Qreactive,
          illustration: QreativeIllustrative,
        }
      }
    };

    setCircuits((prevState) => [...prevState, objInfoCircuit]);

    setAddNewCircuit(false);
    setChangeInfosCircuit({
      efficiency: 0,
      fp: 0,
      name: '',
      quantity: 0,
      valuePotency: 0,
      typePotency: '',
      illustrationCalcPotency: '',
      id: String(Math.random()),
    });
    setValueCVAndHP(0);
  }

  const disabledConfirmAddNewCircuit = (
    changeInfosCircuit.fp &&
    changeInfosCircuit.efficiency &&
    changeInfosCircuit.name &&
    changeInfosCircuit.quantity &&
    changeInfosCircuit.typePotency &&
    changeInfosCircuit.valuePotency &&
    errors.length === 0
  );

  return {
    setAddNewCircuit,
    addNewCircuit,
    setTensionVfn,
    tensionVfn,
    changeInfosCircuit,
    handleUpdateName,
    handleUpdateQuantity,
    handleUpdateTypePotency,
    handleValuePotency,
    handleUpdateValueFpOnBlur,
    handleUpdateEfficiencyOnBlur,
    handleUpdateEfficiencyOnChange,
    handleConfirmAddNewCircuit,
    disabledConfirmAddNewCircuit,
    getErrorMessageByFieldName,
    handleUpdateValueFpOnChange,
    valueCVAndHP,
    circuits,
    sumsIllustrationAndValue,
  };
}
