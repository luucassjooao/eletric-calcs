import { ChangeEvent, useEffect, useState } from 'react';
import AddNewCircuit from './components/addNewCircuit';
import ViewInfosCircuit from './components/viewInfosCircuit';
import { useErrors } from '@/app/hooks/useErrors';
import { cn } from '@/app/libs/utils';
import { objIlustrativeString, objRealSum } from './constant/objLiterals';
import { colors } from './constant/colors';
import { formatNumber } from '@/app/utils/functions/formatNumber';

export type TypePotency = 'Watts' | 'CV' | 'HP' | 'VA' | '';

export interface ICircuit {
  id: string;
  // type: string; // indutive resistive capacitive
  typePotency: TypePotency;
  valuePotency: number;
  ilustrativeCalcPotency: string;
  usageVolts: number;
  threePhase: boolean;
  fp: number;
  efficiency: number;
  name: string;
  quantity: number;

  calcsValues?: {
    current: {
      value: string;
      ilustrative: string
    };
    CosDegrees: {
      value: string;
      ilustrative: string;
    }
    horizontalCurrent: {
      value: string;
      ilustrative: string;
    }
    verticalCurrent: {
      value: string;
      ilustrative: string;
    }
  }
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
    ilustrativeCalcPotency: '',
    id: String(Math.random())
  });
  const [editLineUsageTension, setEditLineUsageTension] = useState(true);
  const [lineTension, setLineTension] = useState(0);

  const [sums, setSums] = useState({
    totalSumHorizontalCurrent: 0,
    totalSumVerticalCurrent: 0,
    totalCurrent: 0,
    tanDegree: 0,
    tanRadians: 0,
    FPSystem: 0,
    potencySs: 0,
    potencyP: 0,
    potenctQ: 0,
  });
  const [ilustrativeSums, setIlustrativesSums] = useState<{
    totalHorizontalCurrent?: {
      ilustrative: string[];
    };
    totalVerticalCurrent?: {
      ilustrative: string[];
    };
  }>({
    totalHorizontalCurrent: {
      ilustrative: [],
    },
    totalVerticalCurrent: {
      ilustrative: []
    },
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

    const totalCurrent = Math.sqrt(
      Math.pow(totalSumHorizontalCurrent, 2) + Math.pow(-totalSumVerticalCurrent, 2)
    );

    const tanDegree = Math.atan(
      -totalSumVerticalCurrent / totalSumHorizontalCurrent
    ) * (180 / Math.PI);
    const tanRadians = tanDegree * (Math.PI / 180);
    console.log({ tanRadians }, Math.cos(tanRadians));

    const FPSystem = Math.cos(tanRadians);

    const potencySs = Math.sqrt(3) * lineTension * totalCurrent;
    const potencyP = potencySs * FPSystem;
    const potenctQ = Math.sqrt(
      Math.pow(potencySs, 2) + Math.pow(potencyP, 2)
    );

    setSums({
      FPSystem,
      potenctQ,
      potencyP,
      potencySs,
      tanDegree,
      tanRadians,
      totalCurrent,
      totalSumHorizontalCurrent,
      totalSumVerticalCurrent
    });
  }, [lineTension, circuits]);

  const regexAlphabeticCharacters = /[a-zA-Z]/g;

  function handlerUpdateQuantity(event: InputChange) {
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

  function handlerUpdateTypePotency(value: string) {
    const valueTypePotency = value as TypePotency;
    if (!value) {
      setError({ field: 'typePotency', message: 'Selecione a unidade de potência' });
    } else {
      removeError({ fieldName: 'typePotency' });
    }
    setChangeInfosCircuit((prev) => {
      const typePotency = valueTypePotency;
      const ilustrativeCalcPotency = objIlustrativeString[valueTypePotency](String(valueTypePotency));
      return { ...prev, typePotency, ilustrativeCalcPotency };
    });
  }

  function handlerValuePotency(event: InputChange) {
    const { value } = event.target;

    if (!value) {
      setError({ field: 'valuePotency', message: `Coloque o valor em ${changeInfosCircuit.typePotency}` });
    } else {
      removeError({ fieldName: 'valuePotency' });
    }

    const valueNumber = Number(value.replace(regexAlphabeticCharacters, ''));
    setValueCVAndHP(valueNumber);

    setChangeInfosCircuit((prev) => {
      const ilustrativeCalcPotency = objIlustrativeString[prev.typePotency](value.replace(regexAlphabeticCharacters, ''));
      const valuePotency = objRealSum[prev.typePotency]((valueNumber));
      console.log(valuePotency);
      return { ...prev, valuePotency, ilustrativeCalcPotency };
    });
  }

  function handlerValueTension(event: InputChange) {
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

  function handlerUpdateValueFpOnChange(event: InputChange) {
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

  function handlerUpdateValueFpOnBlur(event: InputChange) {
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

  function handlerUpdateEfficiencyOnChange(event: InputChange) {
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

  function handlerUpdateEfficiencyOnBlur(event: InputChange) {
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

  function handlerUpdateTP(value: string) {
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

  function handlerUpdateName(event: InputChange) {
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

  function handlerConfirmAddNewCircuit() {
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
    const currentIlustrative =
      `${(formatNumber(changeInfosCircuit.valuePotency))}/(${changeInfosCircuit.threePhase ? '√3' : '1'
      }x${formatNumber(changeInfosCircuit.usageVolts)}
        ${changeInfosCircuit.typePotency !== 'VA' ? (
        'x' + String(changeInfosCircuit.fp).slice(0, 4) + 'x' +
        String(changeInfosCircuit.efficiency).slice(0, 4)
      ) : ''})`;

    const CosRadians = Math.acos(changeInfosCircuit.fp);
    const CosDegrees = CosRadians * (180 / Math.PI);
    const CosDegreesIlustrative = `cos-1(${String(changeInfosCircuit.fp).slice(0, 4)})`;

    const horizontalCurrent = usageCurrent * Math.cos(CosRadians);
    const horizontalCurrentIlustrative =
      `${formatNumber(usageCurrent)}xcos-1(${String(CosDegrees).slice(0, 4)})`;

    const verticalCurrent = changeInfosCircuit.fp === 1 ? 0 : usageCurrent * -Math.sin(CosRadians);
    const verticalCurrentIlustrative =
      `${formatNumber(usageCurrent)}*sin(-${String(CosDegrees).slice(0, 4)})`;

    setIlustrativesSums((prev) => {
      const totalHorizontalCurrent = prev.totalHorizontalCurrent?.ilustrative.concat(horizontalCurrentIlustrative) || [];
      const totalVerticalCurrent = prev.totalVerticalCurrent?.ilustrative.concat(verticalCurrentIlustrative) || [];
      return {
        totalHorizontalCurrent: {
          ilustrative: totalHorizontalCurrent
        },
        totalVerticalCurrent: {
          ilustrative: totalVerticalCurrent
        },
      };
    });

    const obj: ICircuit = {
      ...changeInfosCircuit,
      calcsValues: {
        current: {
          value: String(usageCurrent),
          ilustrative: currentIlustrative
        },
        CosDegrees: {
          value: String(CosDegrees).slice(0, 4),
          ilustrative: CosDegreesIlustrative
        },
        horizontalCurrent: {
          value: String(horizontalCurrent),
          ilustrative: horizontalCurrentIlustrative
        },
        verticalCurrent: {
          value: String(-verticalCurrent),
          ilustrative: verticalCurrentIlustrative
        }
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
      ilustrativeCalcPotency: '',
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
    changeInfosCircuit.ilustrativeCalcPotency &&
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
            setEditUsageTension={setEditLineUsageTension}
            editLineUsageTension={editLineUsageTension}
            changeInfosCircuit={changeInfosCircuit}
            handlerUpdateName={handlerUpdateName}
            handlerUpdateQuantity={handlerUpdateQuantity}
            handlerUpdateTypePotency={handlerUpdateTypePotency}
            handlerValuePotency={handlerValuePotency}
            handlerValueTension={handlerValueTension}
            handlerUpdateValueFpOnBlur={handlerUpdateValueFpOnBlur}
            handlerUpdateValueFpOnChange={handlerUpdateValueFpOnChange}
            handlerUpdateEfficiencyOnChange={handlerUpdateEfficiencyOnChange}
            handlerUpdateEfficiencyOnBlur={handlerUpdateEfficiencyOnBlur}
            handlerUpdateTP={handlerUpdateTP}
            handlerConfirmAddNewCircuit={handlerConfirmAddNewCircuit}
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

            <h3>Corrente dos circuitos: {formatNumber(sums.totalCurrent)}A</h3>
            {circuits.map((item, index) => (
              <h5 key={index} className={`${colors[index % colors.length]}`} >
                {item.calcsValues?.current.ilustrative}
              </h5>
            ))}

            <h1>Corrente horizontal dos circuitos: {formatNumber(sums.totalSumHorizontalCurrent)}A</h1>
            {circuits.map((item, index) => (
              <h5 key={index} className={`${colors[index + 1 % colors.length]}`} >
                {item.calcsValues?.horizontalCurrent.ilustrative}
              </h5>
            ))}

            <h1>Corrente Vertical dos circuitos: {formatNumber(sums.totalSumVerticalCurrent)}A</h1>
            {circuits.map((item, index) => (
              <h5 key={index} className={`${colors[index + 2 % colors.length]}`} >
                {item.calcsValues?.verticalCurrent.ilustrative}
              </h5>
            ))}

            <h3>Corrente Total Horizontal: {formatNumber(sums.totalSumHorizontalCurrent)}A</h3>
            <h5 className="text-green-300" >{ilustrativeSums.totalHorizontalCurrent?.ilustrative.join('+')}</h5>

            <h3>Corrente Total Vertical: {formatNumber(sums.totalSumVerticalCurrent)}A</h3>
            <h5 className="text-green-400" >{ilustrativeSums.totalVerticalCurrent?.ilustrative.join('+')}</h5>

            <h3>Corrente Total: {formatNumber(sums.totalCurrent)}A</h3>
            <h5 className='text-purple-300' >√{`((${formatNumber(sums.totalSumHorizontalCurrent)})^2 + (-${formatNumber(sums.totalSumVerticalCurrent)})^2)`}</h5>

            <h3>Corrente x Tan: {formatNumber(sums.tanDegree)}</h3>
            <h5 className='text-purple-400' >{formatNumber(sums.totalCurrent)} x √{`(-${formatNumber(sums.totalSumVerticalCurrent)}/${formatNumber(sums.totalSumHorizontalCurrent)})`}</h5>

            <h3>Fator de potência do sistema: {String(sums.FPSystem).slice(0, 4)}</h3>
            <h5 className='text-yellow-300' >cos{`(${formatNumber(sums.tanDegree)})`}</h5>

            <h3>Potência Aparente: {formatNumber(sums.potencySs)}W</h3>
            <h5 className={colors[0]} >√3 x {formatNumber(lineTension)} x {formatNumber(sums.totalCurrent)}</h5>

            <h3>Potência P: {formatNumber(sums.potencyP)}W</h3>
            <h5 className={colors[1]} >{formatNumber(sums.potencySs)} * {String(sums.FPSystem).slice(0, 4)}</h5>

            <h3>Potência Q: {formatNumber(sums.potenctQ)}W</h3>
            <h5 className={colors[2]} >√{`(${formatNumber(sums.potencySs)}^2 + ${formatNumber(sums.potencyP)}^2)`}</h5>
          </div>
        )}
      </div>
    </div>
  );
}
