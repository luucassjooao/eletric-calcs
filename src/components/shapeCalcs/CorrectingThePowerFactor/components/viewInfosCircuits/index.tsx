import { useState } from 'react';
import { formatNumber } from '@/app/utils/functions/formatNumber';
import { ICircuit } from '@/app/hooks/standardFuncsOnShapeCalcs/types';
import { ICalcsValues } from '../../types';

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

export function ViewInfosCircuits({ circuits }: IProps) {
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
  return(
    <div className='bg-muted/50 p-4 mt-4 rounded-md'>
    <h1 className="font-bold text-xl text-center">Circuitos</h1>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' >
      {circuits.map((item, index) => (
  <div
  key={index}
  className='ml-2 rounded-md border-gray-500 border mb-2 shadow-2xl h-fit'
>
  <div className='p-3 pr-5' >
    <h4>Nome: <span className='text-muted-foreground' >{item.name}</span></h4>
    <h4>Quantidade: <span className='text-muted-foreground' >{item.quantity}</span></h4>

    {item.typePotency === 'CV' && (
      <>
          <h4
          onClick={() => viewFormula({ id: item.id, where: 'potency' })}
          className='underline underline-offset-4 hover:text-gray-300'
        >Potência mecânica:
          <span className={'text-muted-foreground'}>
            {item.calcsValues?.Pmec.value}W
          </span>
        </h4>
        {underlineFormula.find((form) => form.id === item.id && form.where === 'potency') && (
          <small className='text-blue-400' >{item.calcsValues?.Pmec.illustration}</small>
        )}
    </>
    )}

    <h4
      onClick={() => viewFormula({ id: item.id, where: 'potency' })}
      className='underline underline-offset-4 hover:text-gray-300'
    >Potência elétrica:
      <span className={'text-muted-foreground'}>
        {formatNumber(item.valuePotency)}W
      </span>
    </h4>
    {underlineFormula.find((form) => form.id === item.id && form.where === 'potency') && (
      <small className='text-blue-400' >{item.illustrationCalcPotency}</small>
    )}
    <h4
      onClick={() => viewFormula({ id: item.id, where: 'cos' })}
      className='underline underline-offset-4 hover:text-gray-300'
    >
      Grau defasado: <span className='text-muted-foreground' >-{String(item.calcsValues?.arccos.value).slice(0, 4)}°</span>
    </h4>
    {underlineFormula.find((form) => form.id === item.id && form.where === 'cos') && (
      <small className='text-blue-400' >{item.calcsValues?.arccos.illustration}</small>
    )}
    <h4>f.P: <span className='text-muted-foreground' >{String(item.fp).slice(0, 4)}</span></h4>
    <h4>Rendimento: <span className='text-muted-foreground' >{String(item.efficiency).slice(0, 4)}</span></h4>
    {moreInfos.find((more) => more.id === item.id ? true : false) && (
      <div>
        <h4
          className='underline underline-offset-4 hover:text-gray-300'
          onClick={() => viewFormula({ id: item.id, where: 'horizontal' })}
        >PCapactivo: <span className='text-muted-foreground' >{formatNumber(Number(item.calcsValues?.PCapacitive.value))}W</span> </h4>
        {underlineFormula.find((form) => form.id === item.id && form.where === 'horizontal') && (
          <small
            className='text-blue-400'
          >
            {item.calcsValues?.PCapacitive.illustration}
          </small>
        )}
        <h4
          className='underline underline-offset-4 hover:text-gray-300'
          onClick={() => viewFormula({ id: item.id, where: 'vertical' })}
        >QReativo: <span className='text-muted-foreground' >-{formatNumber(Number(item.calcsValues?.QReactive.value))}VAR</span></h4>
        {underlineFormula.find((form) => form.id === item.id && form.where === 'vertical') && (
          <small
            className='text-blue-400'
          >
            {item.calcsValues?.QReactive.illustration}
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
