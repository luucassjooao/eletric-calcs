import { useEffect, useState } from 'react';
import { ICircuit, ISumsValueAndIllustration, TypePotency } from './types';
import { formatNumber } from '@/app/utils/functions/formatNumber';
import { InputChange } from '.';
import { objIllustrationString, objRealSum } from './constant/objLiterals';
import { useErrors } from '@/app/hooks/useErrors';
import * as F from './constant/fieldSetError';

export function useInfosTrafoBySecundarySide() {
  const [circuits, setCircuits] = useState<ICircuit[]>([]);
  const [addNewCircuit, setAddNewCircuit] = useState(false);
  const [changeInfosCircuit, setChangeInfosCircuit] = useState<ICircuit>({
    efficiency: 0,
    fp: 0,
    name: '',
    quantity: 0,
    usageVolts: 0,
    threePhase: false,
    valuePotency: 0,
    typePotency: '',
    illustrationCalcPotency: '',
    id: String(Math.random()),
  });
  const [lineTension, setLineTension] = useState(0);
  const [turnsRatio, setTurnsRatio] = useState({
      primary: 0,
      secundary: 0
  });

  const [sumsIllustrationAndValue, setSumsIllustrationValue] = useState<ISumsValueAndIllustration>({
    horizontalCurrent: {
      value: '',
      illustration: []
    },
    verticalCurrent: {
      value: '',
      illustration: []
    },
    totalCurrentSecundary: {
      value: '',
      illustration: '',
    },
    tanTotalCurrentLineSecundary: {
      value: '',
      illustration: '',
    },
    tensionPhaseSecundary: {
      value: '',
      illustration: '',
    },
    tensionPhasePrimary: {
      value: '',
      illustration: '',
    },
    currentLinePrimary: {
      value: '',
      illustration: '',
    },
    apparentPotencyS: {
      value: '',
      illustration: '',
    },
    activePotencyP: {
      value: '',
      illustration: '',
    },
    reactivePotencyQ: {
      value: '',
      illustration: '',
    },
    FPSystem: {
      value: '',
      illustration: '',
    },
    tanDegreeCurrentSecundary: '',
  });

  const [valueCVAndHP, setValueCVAndHP] = useState(0);

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError
  } = useErrors();

  useEffect(() => {
    const totalSumHorizontalCurrent = circuits.reduce((acc, curr) => {
      return acc += Number(curr.calcsValues?.horizontalCurrent.value);
    }, 0);

    const totalSumVerticalCurrent = circuits.reduce((acc, curr) => {
      return acc += Number(curr.calcsValues?.verticalCurrent.value);
    }, 0);

    const totalCurrentSecundaryHorizontalxVertical = Math.sqrt(
      Math.pow(totalSumHorizontalCurrent, 2) + Math.pow(-totalSumVerticalCurrent, 2)
    );
    const totalCurrentSecundaryHorizontalxVerticalIllustration =
      `√((${formatNumber(totalSumHorizontalCurrent)})^2 + (-${formatNumber(totalSumVerticalCurrent)})^2)`;

    const tanTotalCurrentLineSecundary = Math.atan(
      -totalSumVerticalCurrent / totalSumHorizontalCurrent
    ) * (180 / Math.PI);
    const tanTotalCurrentLineSecundaryIllustration =
    `${formatNumber(totalCurrentSecundaryHorizontalxVertical) + 'x' + 'tan-1' + `(-${formatNumber(totalSumVerticalCurrent)}/${formatNumber(totalSumHorizontalCurrent)})`}`;

    const tanRadians = tanTotalCurrentLineSecundary * (Math.PI / 180);
    const FPSystem = Math.cos(tanRadians);
    const FPSystemIllustration = `cos(${String(tanRadians).slice(0, 4)})`;

    const potencySs = Math.sqrt(3) * lineTension * totalCurrentSecundaryHorizontalxVertical;
    const potencySsIllustration = `√3 x ${formatNumber(lineTension)} x ${formatNumber(totalCurrentSecundaryHorizontalxVertical)}`;

    const potencyP = potencySs * FPSystem;
    const potencyPIllustration = `${formatNumber(potencySs)} * ${String(FPSystem).slice(0, 4)}`;

    const potencyQ = Math.sqrt(
      Math.pow(potencySs, 2) + Math.pow(potencyP, 2)
    );
    const potencyQIllustration = `√{(${formatNumber(potencySs)}^2 + ${formatNumber(potencyP)}^2)}`;

    const tensionPhaseSecundary = lineTension / Math.sqrt(3);
    const tensionPhaseSecundaryIllustration = `${formatNumber(lineTension)}/√3`;

    const divisionTurnsRatio = turnsRatio.primary/turnsRatio.secundary;
    const divisionTurnsRatioIllustration = `${turnsRatio.primary}/${turnsRatio.secundary}`;

    const tensionPhasePrimary = tensionPhaseSecundary*divisionTurnsRatio;
    const tensionPhasePrimaryIllustration = `${formatNumber(tensionPhaseSecundary)}x(${divisionTurnsRatioIllustration})`;

    const currentLinePrimary = potencySs/(tensionPhasePrimary*Math.sqrt(3));
    const currentLinePrimaryIllustration = `${formatNumber(potencySs)}/(${formatNumber(tensionPhasePrimary)})x√3)`;

    setSumsIllustrationValue((prevState) => ({
      ...prevState,
      totalCurrentSecundary: {
        value: formatNumber(totalCurrentSecundaryHorizontalxVertical),
        illustration: totalCurrentSecundaryHorizontalxVerticalIllustration
      },
      tanTotalCurrentLineSecundary: {
        value: formatNumber(tanTotalCurrentLineSecundary),
        illustration: tanTotalCurrentLineSecundaryIllustration
      },
      tensionPhaseSecundary: {
        value: formatNumber(tensionPhaseSecundary),
        illustration: tensionPhaseSecundaryIllustration
      },
      tensionPhasePrimary: {
        value: formatNumber(tensionPhasePrimary),
        illustration: tensionPhasePrimaryIllustration
      },
      currentLinePrimary: {
        value: String(currentLinePrimary).slice(0, 6),
        illustration: currentLinePrimaryIllustration
      },
      apparentPotencyS: {
        value: formatNumber(potencySs),
        illustration: potencySsIllustration
      },
      activePotencyP: {
        value: formatNumber(potencyP),
        illustration: potencyPIllustration
      },
      reactivePotencyQ: {
        value: formatNumber(potencyQ),
        illustration: potencyQIllustration
      },
      FPSystem: {
        value: String(FPSystem).slice(0, 4),
        illustration: FPSystemIllustration
      },
      tanDegreeCurrentSecundary: String(tanRadians).slice(0, 4)
    }));
  }, [lineTension, circuits, turnsRatio]);

  const regexAlphabeticCharacters = /[a-zA-Z]/g;

  function handleUpdateQuantity(event: InputChange) {
    const { value } = event.target;
    const numericValue = value.replace(regexAlphabeticCharacters, '');

    if (!numericValue) {
      setError({ field: F.fieldSetErrorQuantity, message: 'Coloque quantos circuitos igual a este!' });
    } else {
      removeError({ fieldName: F.fieldSetErrorQuantity });
    }

    setChangeInfosCircuit((prev) => {
      return { ...prev, quantity: Number(numericValue) };
    });
  }

  function handleUpdateTypePotency(value: string) {
    const valueTypePotency = value as TypePotency;
    if (!value) {
      setError({ field: F.fieldSetErrorTypePotency, message: 'Selecione a unidade de potência' });
    } else {
      removeError({ fieldName: F.fieldSetErrorTypePotency });
    }
    setChangeInfosCircuit((prev) => {
      const typePotency = valueTypePotency;
      const illustrationCalcPotency = objIllustrationString[valueTypePotency](String(valueTypePotency));
      return { ...prev, typePotency, illustrationCalcPotency };
    });
  }

  function handleValuePotency(event: InputChange) {
    const { value } = event.target;

    if (!value) {
      setError({ field: F.fieldSetErrorValuePotency, message: `Coloque o valor em ${changeInfosCircuit.typePotency}` });
    } else {
      removeError({ fieldName: F.fieldSetErrorValuePotency });
    }

    const valueNumber = Number(value.replace(regexAlphabeticCharacters, ''));
    setValueCVAndHP(valueNumber);

    setChangeInfosCircuit((prev) => {
      const illustrationCalcPotency = objIllustrationString[prev.typePotency](value.replace(regexAlphabeticCharacters, ''));
      const valuePotency = objRealSum[prev.typePotency]((valueNumber));
      return { ...prev, valuePotency, illustrationCalcPotency };
    });
  }

  function handleValueTension(event: InputChange) {
    const { value } = event.target;

    if (!value) {
      setError({ field: F.fieldSetErrorTension, message: 'Coloque a tensão na qual está circuito utiliza' });
    } else {
      removeError({ fieldName: F.fieldSetErrorTension });
    }
    setChangeInfosCircuit((prev) => {
      const usageVolts = Number(value.replace(regexAlphabeticCharacters, ''));
      return { ...prev, usageVolts };
    });
  }

  function handleUpdateValueFpOnChange(event: InputChange) {
    const value = event.target.value;

    if (!value) {
      setError({ field: F.fieldSetErrorFp, message: 'Coloque o Fator de potência com números inteiro' });
    } else {
      removeError({ fieldName: F.fieldSetErrorFp });
    }

    setChangeInfosCircuit((prev) => {
      return { ...prev, fp: Number(value) };
    });
  }

  function handleUpdateValueFpOnBlur(event: InputChange) {
    let value = event.target.value.replace(/[^0-9.,]/g, '');
    if (value === '1') {
      value = '1';
    } else {
      value = `0.${value}`;
    }

    if (!value) return;

    setChangeInfosCircuit((prev) => {
      return { ...prev, fp: Number(value) };
    });
  }

  function handleUpdateEfficiencyOnChange(event: InputChange) {
    const value = event.target.value;

    if (!value) {
      setError({ field: F.fieldSetErrorEfficiency, message: 'Coloque o valor do Rendimento com números inteiro' });
    } else {
      removeError({ fieldName: F.fieldSetErrorEfficiency });
    }
    setChangeInfosCircuit((prev) => {
      return { ...prev, efficiency: Number(value) };
    });
  }

  function handleUpdateEfficiencyOnBlur(event: InputChange) {
    let value = event.target.value.replace(/[^0-9.,]/g, '');
    if (value === '1') {
      value = '1';
    } else {
      value = `0.${value}`;
    }

    setChangeInfosCircuit((prev) => {
      return { ...prev, efficiency: Number(value) };
    });
  }

  function handleUpdateTP(value: string) {
    if (!value) {
      setError({ field: F.fieldSetErrorThreePhase, message: 'Selecione se está circuito é trifásica ou não' });
    } else {
      removeError({ fieldName: F.fieldSetErrorThreePhase });
    }
    setChangeInfosCircuit((prev) => {
      const threePhase = value === 'Sim' ? true : false;
      return { ...prev, threePhase };
    });
  }

  function handleUpdateName(event: InputChange) {
    const { value } = event.target;

    if (!value) {
      setError({ field: F.fieldSetErrorName, message: 'Dê um nome para essa(s) circuitos(s)!' });
    } else {
      removeError({ fieldName: F.fieldSetErrorName });
    }
    setChangeInfosCircuit((prev) => {
      const name = event.target.value;
      return { ...prev, name };
    });
  }

  function handleUpdateTurnsRatioOnChange(event: InputChange) {
    const value = event.target.value;

    if(!value) {
      setError({ field: F.fieldSetErrorTurnsRatio, message: 'Coloque a relação de espiras!' });
    } else {
      removeError({ fieldName: F.fieldSetErrorTurnsRatio });
    }
  }

  function handleUpdateTurnsRatioOnBlur(event: InputChange) {
    const value = event.target.value;
    const regexVerificationShapeTurnsRatio = /^\d+:\d+$/;

    if(!value) {
      setError({ field: F.fieldSetErrorTurnsRatio, message: 'Coloque a relação de espiras!' });
    } else if (!regexVerificationShapeTurnsRatio.test(value)) {
      setError({ field: F.fieldSetErrorTurnsRatio, message: 'Formato de espiras inválido. Ele deve ser assim: 1000:100' });
      return;
    } else {
      removeError({ fieldName: F.fieldSetErrorTurnsRatio });
    }

    const [primary, secundary] = value.split(':');
    setTurnsRatio({
      primary: Number(primary), secundary: Number(secundary)
    });
  }

  function handleConfirmAddNewCircuit() {
    const current =
      (changeInfosCircuit.valuePotency) / (
        (changeInfosCircuit.threePhase ?
          Math.sqrt(3) : 1) *
        changeInfosCircuit.usageVolts *
        changeInfosCircuit.fp *
        changeInfosCircuit.efficiency
      );
    const currentWithoutFp = (changeInfosCircuit.valuePotency) / (
      (changeInfosCircuit.threePhase ?
        Math.sqrt(3) : 1) *
      changeInfosCircuit.usageVolts
    );

    const usageCurrent = changeInfosCircuit.typePotency === 'VA' ? currentWithoutFp :  current;
    const currentIllustration =
      `(${(formatNumber(changeInfosCircuit.valuePotency))}/(${changeInfosCircuit.threePhase ? '√3' : '1'
      }x${formatNumber(changeInfosCircuit.usageVolts)}
        ${changeInfosCircuit.typePotency !== 'VA' ? (
        'x' + String(changeInfosCircuit.fp).slice(0, 4) + 'x' +
        String(changeInfosCircuit.efficiency).slice(0, 4)
      ) : ''}))`;

    const CosRadians = Math.acos(changeInfosCircuit.fp);
    const CosDegrees = CosRadians * (180 / Math.PI);
    const CosDegreesIllustrative = `cos-1(${String(changeInfosCircuit.fp).slice(0, 4)})`;

    const horizontalCurrent = usageCurrent * Math.cos(CosRadians);
    const horizontalCurrentIllustration =
      `${formatNumber(usageCurrent)}xcos-1(-${String(CosDegrees).slice(0, 4)})`;

    const verticalCurrent = changeInfosCircuit.fp === 1 ? 0 : usageCurrent * -Math.sin(CosRadians);
    const verticalCurrentIllustration =
      `${formatNumber(usageCurrent)}*sin(-${String(CosDegrees).slice(0, 4)})`;

    setSumsIllustrationValue((prevState) => ({
      ...prevState,
      horizontalCurrent: {
        value: formatNumber(horizontalCurrent),
        illustration:  prevState.horizontalCurrent.illustration.concat(horizontalCurrentIllustration)
      },
      verticalCurrent: {
        value: formatNumber(verticalCurrent),
        illustration: prevState.verticalCurrent.illustration.concat(verticalCurrentIllustration)
      },
    }));

    const obj: ICircuit = {
      ...changeInfosCircuit,
      calcsValues: {
        current: {
          value: formatNumber(usageCurrent),
          illustration: currentIllustration,
        },
        CosDegrees: {
          value: String(CosDegrees).slice(0, 4),
          illustration: CosDegreesIllustrative
        },
        horizontalCurrent: {
          value: formatNumber(horizontalCurrent),
          illustration: horizontalCurrentIllustration
        },
        verticalCurrent: {
          value: formatNumber(-verticalCurrent),
          illustration: verticalCurrentIllustration
        },
      }
    };

    setCircuits((prev) => {
      return [...prev, obj];
    });

    setAddNewCircuit(false);
    setChangeInfosCircuit({
      efficiency: 0,
      fp: 0,
      name: '',
      quantity: 1,
      usageVolts: 0,
      threePhase: false,
      valuePotency: 0,
      typePotency: '',
      illustrationCalcPotency: '',
      id: String(Math.random()),
    });
    setValueCVAndHP(0);
  }

  const disabledConfirmAddNewCircuit = !(
    changeInfosCircuit.efficiency &&
    changeInfosCircuit.fp &&
    changeInfosCircuit.name &&
    changeInfosCircuit.quantity &&
    changeInfosCircuit.usageVolts &&
    changeInfosCircuit.valuePotency &&
    changeInfosCircuit.typePotency &&
    changeInfosCircuit.illustrationCalcPotency &&
    errors.length === 0
  );

  return {
    circuits,
    setAddNewCircuit,
    addNewCircuit,
    setLineTension,
    lineTension,
    turnsRatio,
    handleUpdateTurnsRatioOnChange,
    handleUpdateTurnsRatioOnBlur,
    changeInfosCircuit,
    handleUpdateName,
    handleUpdateQuantity,
    handleUpdateTypePotency,
    handleValuePotency,
    handleValueTension,
    handleUpdateValueFpOnBlur,
    handleUpdateValueFpOnChange,
    handleUpdateEfficiencyOnChange,
    handleUpdateEfficiencyOnBlur,
    handleUpdateTP,
    handleConfirmAddNewCircuit,
    disabledConfirmAddNewCircuit,
    getErrorMessageByFieldName,
    valueCVAndHP,
    sumsIllustrationAndValue
  };
}
