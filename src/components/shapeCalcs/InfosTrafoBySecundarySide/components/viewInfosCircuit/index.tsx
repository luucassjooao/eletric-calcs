import { useState } from 'react';
import { formatNumber } from '@/app/utils/functions/formatNumber';
import { ICalcsValues } from '../../types';
import { ICircuit } from '@/app/hooks/standardFuncsOnShapeCalcs/types';

interface IProps {
  circuits: ICircuit<ICalcsValues>[];
}

export interface IUnderlineFormula {
  id: string;
  where: string;
}

export interface IMoreInfo {
  id: string;
}

export default function ViewInfosCircuit({ circuits }: IProps) {
  const [underlineFormula, setUnderlineFormula] = useState<IUnderlineFormula[]>([]);
  const [moreInfos, setMoreInfos] = useState<IMoreInfo[]>([]);

  function handleMoreInfos(id: string) {
    setMoreInfos((prevState) => {
      const find = prevState.find((more) => more.id === id);
      if (find) {
        return prevState.filter((more) => more.id !== id);
      }
      return prevState.concat({ id });
    });
  }

  function viewFormula({ id, where }: IUnderlineFormula) {
    setUnderlineFormula((prevState) => prevState.concat({ id, where }));
  }

  return (
    <div className='bg-muted/50 p-4 mt-4 rounded-md'>
      <h1 className='font-bold text-xl text-center' >Circuitos</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' >
        {circuits.map((item, index) => (
          <div
            key={index}
            className='ml-2 rounded-md border-gray-500 border mb-2 shadow-2xl h-fit'
          >
            <div className='p-3 pr-5' >
              <h4>Nome: <span className='text-muted-foreground' >{item.name}</span></h4>
              <h4>Quantidade: <span className='text-muted-foreground' >{item.quantity}</span></h4>
              <h4
                onClick={() => viewFormula({ id: item.id, where: 'potency' })}
                className='underline underline-offset-4 hover:text-gray-300'
              >Potência:
                <span className={'text-muted-foreground'}>
                  {formatNumber(item.valuePotency)}W
                </span>
              </h4>
              {underlineFormula.find((form) => form.id === item.id && form.where === 'potency') && (
                <small className='text-blue-400' >{item.illustrationCalcPotency}</small>
              )}
              <h4>Tensão usada: <span className='text-muted-foreground' >{formatNumber(item.usageVolts!)}V</span></h4>
              <h4
                onClick={() => viewFormula({ id: item.id, where: 'cos' })}
                className='underline underline-offset-4 hover:text-gray-300'
              >
                Grau defasado: <span className='text-muted-foreground' >-{item.calcsValues?.CosDegrees.value}°</span>
              </h4>
              {underlineFormula.find((form) => form.id === item.id && form.where === 'cos') && (
                <small className='text-blue-400' >{item.calcsValues?.CosDegrees.illustration}</small>
              )}
              <h4>f.P: <span className='text-muted-foreground' >{String(item.fp).slice(0, 4)}</span></h4>
              <h4>Rendimento: <span className='text-muted-foreground' >{String(item.efficiency).slice(0, 4)}</span></h4>
              {moreInfos.find((more) => more.id === item.id ? true : false) && (
                <div>
                  <h4
                    className='underline underline-offset-4 hover:text-gray-300'
                    onClick={() => viewFormula({ id: item.id, where: 'current' })}
                  >Corrente: <span className='text-muted-foreground' >{formatNumber(Number(item.calcsValues?.current.value))}A</span></h4>
                  {underlineFormula.find((form) => form.id === item.id && form.where === 'current') && (
                    <small
                      className='text-blue-400 '
                    >
                      {item.calcsValues?.current.illustration}
                    </small>
                  )}
                  <h4
                    className='underline underline-offset-4 hover:text-gray-300'
                    onClick={() => viewFormula({ id: item.id, where: 'horizontal' })}
                  >Corrente horizontal: <span className='text-muted-foreground' >{formatNumber(Number(item.calcsValues?.horizontalCurrent.value))}A</span> </h4>
                  {underlineFormula.find((form) => form.id === item.id && form.where === 'horizontal') && (
                    <small
                      className='text-blue-400'
                    >
                      {item.calcsValues?.horizontalCurrent.illustration}
                    </small>
                  )}
                  <h4
                    className='underline underline-offset-4 hover:text-gray-300'
                    onClick={() => viewFormula({ id: item.id, where: 'vertical' })}
                  >Corrente vertical: <span className='text-muted-foreground' >-{formatNumber(Number(item.calcsValues?.verticalCurrent.value))}A</span></h4>
                  {underlineFormula.find((form) => form.id === item.id && form.where === 'vertical') && (
                    <small
                      className='text-blue-400'
                    >
                      {item.calcsValues?.verticalCurrent.illustration}
                    </small>
                  )}
                </div>
              )}
            </div>
            <div onClick={() => handleMoreInfos(item.id)} className='text-center p-1 bg-blue-700 hover:bg-blue-900' >
              <span className='font-bold text-base'>+ informações</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
