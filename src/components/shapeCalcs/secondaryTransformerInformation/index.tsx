import { ChangeEvent, useEffect, useState } from 'react';
import AddNewCircuit from './components/addNewCircuit';
import ViewInfosCircuit from './components/viewInfosCircuit';
import { useErrors } from '@/app/hooks/useErrors';
import { cn } from '@/app/libs/utils';
import { objIllustrationString, objRealSum } from './constant/objLiterals';
import { colors } from './constant/colors';
import { formatNumber } from '@/app/utils/functions/formatNumber';

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

interface ISumsValueAndIllustration {
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

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export default function SecondaryTransformerInformations() {
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
      setError({ field: 'quantity', message: 'Coloque quantos circuitos igual a este!' });
    } else {
      removeError({ fieldName: 'quantity' });
    }

    setChangeInfosCircuit((prev) => {
      return { ...prev, quantity: Number(numericValue) };
    });
  }

  function handleUpdateTypePotency(value: string) {
    const valueTypePotency = value as TypePotency;
    if (!value) {
      setError({ field: 'typePotency', message: 'Selecione a unidade de potência' });
    } else {
      removeError({ fieldName: 'typePotency' });
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
      setError({ field: 'valuePotency', message: `Coloque o valor em ${changeInfosCircuit.typePotency}` });
    } else {
      removeError({ fieldName: 'valuePotency' });
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
      setError({ field: 'tension', message: 'Coloque a tensão na qual está circuito utiliza' });
    } else {
      removeError({ fieldName: 'tension' });
    }
    setChangeInfosCircuit((prev) => {
      const usageVolts = Number(value.replace(regexAlphabeticCharacters, ''));
      return { ...prev, usageVolts };
    });
  }

  function handleUpdateValueFpOnChange(event: InputChange) {
    const value = event.target.value;

    if (!value) {
      setError({ field: 'fp', message: 'Coloque o Fator de potência com números inteiro' });
    } else {
      removeError({ fieldName: 'fp' });
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
      setError({ field: 'efficiency', message: 'Coloque o valor do Rendimento com números inteiro' });
    } else {
      removeError({ fieldName: 'efficiency' });
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
      setError({ field: 'threePhase', message: 'Selecione se está circuito é trifásica ou não' });
    } else {
      removeError({ fieldName: 'threePhase' });
    }
    setChangeInfosCircuit((prev) => {
      const threePhase = value === 'Sim' ? true : false;
      return { ...prev, threePhase };
    });
  }

  function handleUpdateName(event: InputChange) {
    const { value } = event.target;

    if (!value) {
      setError({ field: 'name', message: 'Dê um nome para essa(s) circuitos(s)!' });
    } else {
      removeError({ fieldName: 'name' });
    }
    setChangeInfosCircuit((prev) => {
      const name = event.target.value;
      return { ...prev, name };
    });
  }

  function handleUpdateTurnsRatioOnChange(event: InputChange) {
    const value = event.target.value;

    if(!value) {
      setError({ field: 'turnsRatio', message: 'Coloque a relação de espiras!' });
    } else {
      removeError({ fieldName: 'turnsRatio' });
    }
  }

  function handleUpdateTurnsRatioOnBlur(event: InputChange) {
    const value = event.target.value;
    const regexVerificationShapeTurnsRatio = /^\d+:\d+$/;

    if(!value) {
      setError({ field: 'turnsRatio', message: 'Coloque a relação de espiras!' });
    } else if (!regexVerificationShapeTurnsRatio.test(value)) {
      setError({ field: 'turnsRatio', message: 'Formato de espiras inválido. Ele deve ser assim: 1000:100' });
      return;
    } else {
      removeError({ fieldName: 'turnsRatio' });
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

  return (
    <div className='mt-10 max-[815px]:mx-auto mb-14' >
      <h1 className='text-center mb-8 font-bold text-xl' >Informações do secundario do trafo</h1>
      <div className={'flex max-[815px]:flex-col mt-0'} >
        <div className={cn(circuits.length > 0 ? 'max-w-[570px] hover:overflow-y-auto h-screen max-[815px]:h-auto' : 'w-fit', 'mx-auto max-[815px]:w-fit')} >
          <AddNewCircuit
            setAddNewCircuit={setAddNewCircuit}
            addNewCircuit={addNewCircuit}
            setLineTension={setLineTension}
            lineTension={lineTension}
            turnsRatio={turnsRatio}
            handleUpdateTurnsRatioOnChange={handleUpdateTurnsRatioOnChange}
            handleUpdateTurnsRatioOnBlur={handleUpdateTurnsRatioOnBlur}
            changeInfosCircuit={changeInfosCircuit}
            handleUpdateName={handleUpdateName}
            handleUpdateQuantity={handleUpdateQuantity}
            handleUpdateTypePotency={handleUpdateTypePotency}
            handleValuePotency={handleValuePotency}
            handleValueTension={handleValueTension}
            handleUpdateValueFpOnBlur={handleUpdateValueFpOnBlur}
            handleUpdateValueFpOnChange={handleUpdateValueFpOnChange}
            handleUpdateEfficiencyOnChange={handleUpdateEfficiencyOnChange}
            handleUpdateEfficiencyOnBlur={handleUpdateEfficiencyOnBlur}
            handleUpdateTP={handleUpdateTP}
            handleConfirmAddNewCircuit={handleConfirmAddNewCircuit}
            disabledConfirmAddNewCircuit={disabledConfirmAddNewCircuit}
            getErrorMessageByFieldName={getErrorMessageByFieldName}
            valueCVAndHP={valueCVAndHP}
          />
          {circuits.length > 0 && (
            <ViewInfosCircuit circuits={circuits} />
          )}
        </div>

        {circuits.length > 0 && (
          <div className='mx-auto bg-muted/50 p-4 rounded-md h-fit max-[815px]:mt-4' >
            <h1 className='text-center mb-4 font-bold text-xl' >Formulas</h1>

            <h1>Tensão de fase (Secundario): {sumsIllustrationAndValue.tensionPhaseSecundary.value}A</h1>
            <h5 className="text-pink-500" >{sumsIllustrationAndValue.tensionPhaseSecundary.illustration}</h5>

            <h1>Corrente horizontal dos circuitos: {sumsIllustrationAndValue.horizontalCurrent.value}A</h1>
            <h5 className={colors[1]} >{(sumsIllustrationAndValue.horizontalCurrent?.illustration as string[]).join('+')}</h5>

            <h1>Corrente Vertical dos circuitos: {sumsIllustrationAndValue.verticalCurrent.value}A</h1>
            <h5 className={colors[2]} >{(sumsIllustrationAndValue.verticalCurrent?.illustration as string[]).join('+')}</h5>

            <h3>Corrente total (Secundario): {sumsIllustrationAndValue.totalCurrentSecundary.value}A</h3>
            <h5 className='text-purple-300' >{sumsIllustrationAndValue.totalCurrentSecundary.illustration}</h5>

            <h3>Corrente de linha (Secundario): {sumsIllustrationAndValue.totalCurrentSecundary.value} φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>
            <h5 className='text-purple-400' >{sumsIllustrationAndValue.tanTotalCurrentLineSecundary.illustration}</h5>

            <h3>Fator de potência do sistema (Secundario): {sumsIllustrationAndValue.FPSystem.value}</h3>
            <h5 className='text-yellow-300' >{sumsIllustrationAndValue.FPSystem.illustration}</h5>

            <h1>Tensão de fase (Primario): {sumsIllustrationAndValue.tensionPhasePrimary.value}A</h1>
            <h5 className="text-pink-500" >{sumsIllustrationAndValue.tensionPhasePrimary.illustration}</h5>

            <h1>Corrente de linha (Primario): {sumsIllustrationAndValue.currentLinePrimary.value}A</h1>
            <h5 className="text-purple-400" >{sumsIllustrationAndValue.currentLinePrimary.illustration}</h5>

            <h3>Potência Aparente Secundario (Ss): {sumsIllustrationAndValue.apparentPotencyS.value}W φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>
            <h5 className="text-green-300" >{sumsIllustrationAndValue.apparentPotencyS.illustration}</h5>
            <h3>Potência aparente do Primario (Sp): {sumsIllustrationAndValue.apparentPotencyS.value}W φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>

            <h3>Potência Ativa Pp: {sumsIllustrationAndValue.activePotencyP.value}W</h3>
            <h5 className="text-green-400" >{sumsIllustrationAndValue.activePotencyP.illustration}</h5>

            <h3>Potência Reatica Qp: {sumsIllustrationAndValue.reactivePotencyQ.value}W</h3>
            <h5 className="text-green-500" >{sumsIllustrationAndValue.reactivePotencyQ.illustration}</h5>

          </div>
        )}
      </div>
    </div>
  );
}
