import { useState } from 'react';
import { ICircuit, TypePotency } from './types';
import { useErrors } from '../useErrors';
import { InputChange } from '@/app/types/globalTypes';
import * as F from './constant/FieldSetError';
import { objIllustrationString } from '@/app/utils/constant/objIllustrationString';
import { objRealSumByTypePotency } from '@/app/utils/constant/objRealSumByTypePotency';

export function useStandardFuncsOnShapeCalcs<T>() {
  const [circuits, setCircuits] = useState<ICircuit<T>[]>([]);
  const [addNewCircuit, setAddNewCircuit] = useState(false);
  const [changeInfosCircuit, setChangeInfosCircuit] = useState<ICircuit<T>>({
    efficiency: 0,
    fp: 0,
    name: '',
    quantity: 0,
    valuePotency: 0,
    typePotency: '',
    illustrationCalcPotency: '',
    id: String(Math.random()),
  });
  const [lineTension, setLineTension] = useState<number>(0);
  const [tensionVfn, setTensionVfn] = useState<number>(0);
  const [turnsRatio, setTurnsRatio] = useState<{
    primary: number;
    secundary: number;
  }>({
      primary: 0,
      secundary: 0
  });

  const [valueCVAndHP, setValueCVAndHP] = useState<number>(0);

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError
  } = useErrors();

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
      const valuePotency = objRealSumByTypePotency[prev.typePotency]((valueNumber));
      return { ...prev, valuePotency, illustrationCalcPotency };
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
    if (!value) return;
    if (value === '1') {
      value = '1';
    } else {
      value = `0.${value}`;
    }

    if (changeInfosCircuit.typePotency === 'VA') {
      const illustrationPotency = `${changeInfosCircuit.illustrationCalcPotency}x${value}`;
      const valuePotency = Number(value) * changeInfosCircuit.valuePotency;
      setChangeInfosCircuit((prevState) => ({
        ...prevState,
        fp: Number(value),
        illustrationCalcPotency: illustrationPotency,
        valuePotency
      }));
      return;
    }

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

  return {
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
    lineTension, setLineTension,
    turnsRatio, setTurnsRatio,
    valueCVAndHP, setValueCVAndHP,
    tensionVfn, setTensionVfn,
    errors,
    getErrorMessageByFieldName
  };
}
