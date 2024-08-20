import { ICircuit } from '@/app/hooks/standardFuncsOnShapeCalcs/types';
import { MessageError } from '@/app/hooks/useErrors';
import { InputChange } from '@/app/types/globalTypes';
import { Fragment, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import TextInput from '../TextInput';
import FormGroup from '../FormGroup';
import * as F from '@/app/hooks/standardFuncsOnShapeCalcs/constant/FieldSetError';
import ChooseButton from '../ChooseButton';
import { ICalcsValues as ICPF } from '../shapeCalcs/CorrectingThePowerFactor/types';
import { ICalcsValues as IITS } from '../shapeCalcs/InfosTrafoBySecundarySide/types';

interface IProps {
  setAddNewCircuit: (value: React.SetStateAction<boolean>) => void;
  addNewCircuit: boolean;
  setTension: (value: React.SetStateAction<number>) => void;
  tension: number;
  changeInfosCircuit: ICircuit<ICPF | IITS>;
  handleUpdateName(event: InputChange): void;
  handleUpdateQuantity(event: InputChange): void;
  handleUpdateTypePotency(value: string): void;
  handleValuePotency(event: InputChange): void;
  handleValueTension?(event: InputChange): void;
  handleUpdateValueFpOnChange(event: InputChange): void;
  handleUpdateValueFpOnBlur(event: InputChange): void;
  handleUpdateEfficiencyOnBlur(event: InputChange): void;
  handleUpdateEfficiencyOnChange(event: InputChange): void;
  handleConfirmAddNewCircuit(): void;
  disabledConfirmAddNewCircuit: boolean;
  getErrorMessageByFieldName: ({
    fieldName,
  }: MessageError) => string | undefined;
  valueCVAndHP: number;
  placeholderTension: string;
  placeholderEditTension: string;
  handleUpdateTP?(value: string): void;
  turnsRatio?: { primary: number; secundary: number };
  handleUpdateTurnsRatioOnChange?(event: InputChange): void;
  handleUpdateTurnsRatioOnBlur?(event: InputChange): void;
  styleAddNewCircuit: 'InfosTrafoBySecundary' | 'CorrectingThePowerFactor';
}

export function AddNewCircuit({
  setAddNewCircuit,
  addNewCircuit,
  setTension,
  tension,
  changeInfosCircuit,
  handleUpdateName,
  handleUpdateQuantity,
  handleUpdateTypePotency,
  handleValuePotency,
  handleValueTension,
  handleUpdateValueFpOnBlur,
  handleUpdateEfficiencyOnBlur,
  handleUpdateEfficiencyOnChange,
  handleConfirmAddNewCircuit,
  disabledConfirmAddNewCircuit,
  getErrorMessageByFieldName,
  handleUpdateValueFpOnChange,
  valueCVAndHP,
  placeholderTension,
  placeholderEditTension,
  handleUpdateTP,
  turnsRatio,
  handleUpdateTurnsRatioOnChange,
  handleUpdateTurnsRatioOnBlur,
  styleAddNewCircuit,
}: IProps) {
  const [editTension, setEditTension] = useState(false);
  const [onFocus, setOnFocus] = useState({
    set: false,
    where: '',
  });

  const [editTurnsRatio, setEditTurnsRatio] = useState(false);

  useEffect(() => {
    const turnsRatioVerification = !!turnsRatio?.primary;
    turnsRatioVerification ? setEditTurnsRatio(true) : null;
  }, [turnsRatio?.primary]);

  function handleEditTurnsRatio() {
    setEditTurnsRatio((prev) => !prev);
  }
  return (
    <div className="bg-muted/50 p-4 rounded-md">
      <div className="justify-center grid gap-4">
        <Button onClick={() => setAddNewCircuit((prevState) => !prevState)}>
          {addNewCircuit ? 'Cancelar' : 'Adicionar um novo circuito'}
        </Button>
        <div>
          <TextInput
            placeholder={placeholderTension}
            onChange={(e) => setTension(Number(e.target.value))}
            type="numeric"
            value={tension || ''}
            onBlur={() => (tension ? setEditTension(true) : null)}
            disabled={editTension}
            className="justify-center"
          />
          {editTension && (
            <Button
              variant={'ghost'}
              className="border w-full"
              onClick={() => setEditTension(true)}
            >
              {placeholderEditTension}
            </Button>
          )}
          {styleAddNewCircuit === 'InfosTrafoBySecundary' && (
            <Fragment key="turnsRatioInfos">
              <FormGroup
                error={
                  getErrorMessageByFieldName({
                    fieldName: F.fieldSetErrorTurnsRatio,
                  })!
                }
              >
                <span className="text-sm">
                  Qual a relação de espiras do primário e secundário?
                </span>
                <TextInput
                  type="text"
                  placeholder="Ex: 1000:100"
                  onChange={handleUpdateTurnsRatioOnChange}
                  onBlur={handleUpdateTurnsRatioOnBlur}
                  className="justify-center"
                  disabled={editTurnsRatio}
                />
              </FormGroup>
              {editTurnsRatio && (
                <Button
                  variant={'ghost'}
                  className="border w-full"
                  onClick={handleEditTurnsRatio}
                >
                  EDITE RELAÇÃO DE ESPIRAS
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </div>
      {addNewCircuit && (
        <div>
          <div className="flex justify-center gap-8 mt-2">
            <FormGroup
              error={
                getErrorMessageByFieldName({
                  fieldName: F.fieldSetErrorName,
                })!
              }
            >
              <span>Qual o nome deste circuito?</span>
              <TextInput
                type="text"
                placeholder="Ex: Motor trifásico WEG"
                value={changeInfosCircuit.name}
                onChange={handleUpdateName}
              />
            </FormGroup>
            <FormGroup
              error={
                getErrorMessageByFieldName({
                  fieldName: F.fieldSetErrorQuantity,
                })!
              }
            >
              <span className="text-sm">Quantos circuitos igual a este?</span>
              <TextInput
                type="numeric"
                placeholder="Ex: 0, 1, 2"
                onChange={handleUpdateQuantity}
                value={changeInfosCircuit.quantity || ''}
              />
            </FormGroup>
          </div>

          <h3 className="text-center text-xl">A potência está em</h3>
          <div>
            <FormGroup
              error={
                getErrorMessageByFieldName({
                  fieldName: F.fieldSetErrorTypePotency,
                })!
              }
            >
              <ChooseButton
                className="justify-center"
                gridCols={2}
                choices={['Watts', 'VA', 'CV', 'HP']}
                handleUpdateValue={handleUpdateTypePotency}
                valueSelected={changeInfosCircuit.typePotency}
              />
            </FormGroup>
          </div>
          {changeInfosCircuit.typePotency && (
            <div className="flex justify-center gap-4 my-2">
              <FormGroup
                error={
                  getErrorMessageByFieldName({
                    fieldName: F.fieldSetErrorValuePotency,
                  })!
                }
              >
                <TextInput
                  placeholder={`Qual o valor em ${changeInfosCircuit.typePotency}`}
                  onChange={handleValuePotency}
                  value={valueCVAndHP || ''}
                  type="numeric"
                />
              </FormGroup>
              {styleAddNewCircuit === 'InfosTrafoBySecundary' && (
                <FormGroup
                  error={
                    getErrorMessageByFieldName({
                      fieldName: F.fieldSetErrorTension,
                    })!
                  }
                >
                  <TextInput
                    placeholder="Qual o valor da tensao?"
                    onChange={handleValueTension}
                    type="numeric"
                    value={changeInfosCircuit.usageVolts || ''}
                  />
                </FormGroup>
              )}
            </div>
          )}
          <div className="flex justify-center gap-4">
            <div>
            <FormGroup
              error={
                getErrorMessageByFieldName({
                  fieldName: F.fieldSetErrorFp,
                })!
              }
            >
              <TextInput
                placeholder="Qual o fp"
                onBlur={(e) => {
                  handleUpdateValueFpOnBlur(e);
                  setOnFocus({
                    set: false,
                    where: '',
                  });
                }}
                onFocus={() =>
                  setOnFocus({
                    set: true,
                    where: 'fp',
                  })
                }
                type="numeric"
                min={0.1}
                max={1}
                onChange={handleUpdateValueFpOnChange}
                value={changeInfosCircuit.fp || ''}
              >
                {onFocus.set && onFocus.where === 'fp' && (
                  <small className="text-xs mt-1 text-red-700 font-bold">
                    abaixo de 1, não precisa de colocar 0.
                  </small>
                )}
              </TextInput>
            </FormGroup>
          </div>
          <div>
            <FormGroup
              error={
                getErrorMessageByFieldName({
                  fieldName: F.fieldSetErrorEfficiency,
                })!
              }
            >
              <>
                <TextInput
                  placeholder="Qual o rendimento?"
                  onChange={handleUpdateEfficiencyOnChange}
                  onBlur={(e) => {
                    handleUpdateEfficiencyOnBlur(e);
                    setOnFocus({
                      set: false,
                      where: '',
                    });
                  }}
                  onFocus={() =>
                    setOnFocus({
                      set: true,
                      where: 'efficiency',
                    })
                  }
                  min={0.1}
                  max={1}
                  type="numeric"
                  value={changeInfosCircuit.efficiency || ''}
                >
                  {onFocus.set && onFocus.where === 'efficiency' && (
                    <small className="text-xs mt-1 text-red-700 font-bold">
                      Rendimento abaixo de 1, não precisa de colocar 0.
                    </small>
                  )}
                </TextInput>
              </>
            </FormGroup>
          </div>
          </div>
          {styleAddNewCircuit === 'InfosTrafoBySecundary' && (
            <Fragment key="TPInfos">
              <div className="text-center gap-0 mt-4">
                <h1 className="text-xl">É trifasico?</h1>
                <small className="text-xs">(por padrão é não)</small>
              </div>
              <ChooseButton
                gridCols={2}
                choices={['Sim', 'Não']}
                handleUpdateValue={handleUpdateTP!}
                valueSelected={
                  changeInfosCircuit.threePhase === true ? 'Sim' : 'Não'
                }
              />
            </Fragment>
          )}
        </div>
      )}

      <div className="flex justify-center items-center mt-2">
        <Button
          disabled={!disabledConfirmAddNewCircuit}
          onClick={handleConfirmAddNewCircuit}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}
