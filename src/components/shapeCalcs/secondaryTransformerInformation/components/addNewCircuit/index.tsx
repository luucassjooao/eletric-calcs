import { useEffect, useState } from 'react';
import { ICircuit, InputChange } from '../..';
import ChooseButton from '../../../../ChooseButton';
import FormGroup from '../../../../FormGroup';
import TextInput from '../../../../TextInput';
import { MessageError } from '@/app/hooks/useErrors';
import { Button } from '@/components/ui/Button';

interface IProps {
  setAddNewCircuit: (value: React.SetStateAction<boolean>) => void;
  addNewCircuit: boolean;
  setLineTension: (value: React.SetStateAction<number>) => void;
  lineTension: number;
  changeInfosCircuit: ICircuit;
  handleUpdateName(event: InputChange): void;
  handleUpdateQuantity(event: InputChange): void;
  handleUpdateTypePotency(value: string): void;
  handleValuePotency(event: InputChange): void;
  handleValueTension(event: InputChange): void;
  handleUpdateValueFpOnChange(event: InputChange): void;
  handleUpdateValueFpOnBlur(event: InputChange): void;
  handleUpdateEfficiencyOnBlur(event: InputChange): void;
  handleUpdateEfficiencyOnChange(event: InputChange): void;
  handleUpdateTP(value: string): void;
  handleConfirmAddNewCircuit(): void;
  disabledConfirmAddNewCircuit: boolean;
  getErrorMessageByFieldName: ({ fieldName }: MessageError) => string | undefined;
  valueCVAndHP: number;
  turnsRatio: { primary: number; secundary: number; }
  handleUpdateTurnsRatioOnChange(event: InputChange): void;
  handleUpdateTurnsRatioOnBlur(event: InputChange): void;
}

export default function AddNewCircuit({
  setAddNewCircuit,
  addNewCircuit,
  setLineTension,
  lineTension,
  changeInfosCircuit,
  handleUpdateName,
  handleUpdateQuantity,
  handleUpdateTypePotency,
  handleValuePotency,
  handleValueTension,
  handleUpdateValueFpOnBlur,
  handleUpdateEfficiencyOnBlur,
  handleUpdateEfficiencyOnChange,
  handleUpdateTP,
  handleConfirmAddNewCircuit,
  disabledConfirmAddNewCircuit,
  getErrorMessageByFieldName,
  handleUpdateValueFpOnChange,
  valueCVAndHP,
  turnsRatio,
  handleUpdateTurnsRatioOnChange,
  handleUpdateTurnsRatioOnBlur,
}: IProps) {
  const [onFocus, setOnFocus] = useState({
    set: false,
    where: ''
  });

  const [editLineUsageTension, setEditLineUsageTension] = useState(false);
  const [editTurnsRatio, setEditTurnsRatio] = useState(false);

  useEffect(() => {
    const turnsRatioVerification = !!turnsRatio.primary;
    turnsRatioVerification ? setEditTurnsRatio(true) : null;
  }, [turnsRatio.primary]);

  function handleEditTurnsRatio() {
    setEditTurnsRatio((prev) => !prev);
  }

  return (
    <div className='bg-muted/50 p-4 rounded-md'>
      <div className='justify-center grid gap-2' >
        <Button onClick={() => setAddNewCircuit((prevState) => !prevState)}>
          {addNewCircuit ? 'Cancelar' : 'Adicionar um novo circuito'}
        </Button>
        <div >
          <TextInput
            placeholder='Qual a tensão de linha?'
            onChange={(e) => setLineTension(Number(e.target.value))}
            type='numeric'
            value={lineTension || ''}
            onBlur={() => lineTension ? setEditLineUsageTension(true) : null}
            disabled={editLineUsageTension}
            className='justify-center'
          />
          {editLineUsageTension && (
            <Button variant={'ghost'} className='border w-full' onClick={() => setEditLineUsageTension(true)} >EDITE TENSÃO DE LINHA</Button>
          )}
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'turnsRatio' })!} >
              <span className='text-sm' >Qual a relação de espiras do primario e secundario?</span>
              <TextInput
                type='text'
                placeholder='Ex: 1000:100'
                onChange={handleUpdateTurnsRatioOnChange}
                onBlur={handleUpdateTurnsRatioOnBlur}
                className='justify-center'
                disabled={editTurnsRatio}
              />
            </FormGroup>
                        {editTurnsRatio && (
            <Button variant={'ghost'} className='border w-full' onClick={handleEditTurnsRatio} >EDITE RELAÇÃO DE ESPIRAS</Button>
          )}
        </div>
      </div>

      {addNewCircuit && (
        <div>
          <div className='flex justify-center gap-8 mt-2' >
            <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })!} >
              <span>Qual o nome deste circuito?</span>
              <TextInput
                type='text'
                placeholder='Ex: Motor Trifásico WEG'
                value={changeInfosCircuit.name}
                onChange={handleUpdateName}
              />
            </FormGroup>
            <FormGroup error={getErrorMessageByFieldName({ fieldName: 'quantity' })!} >
              <span className='text-sm' >Quantos circuitos igual a este?</span>
              <TextInput
                type='numeric'
                placeholder='Ex: 0, 1, 2'
                onChange={handleUpdateQuantity}
                value={changeInfosCircuit.quantity || ''}
              />
            </FormGroup>
          </div>
          <h3 className='text-center text-xl'>A Potência está em</h3>
          <div>
            <FormGroup error={getErrorMessageByFieldName({ fieldName: 'typePotency' })!} >
              <ChooseButton
                className='justify-center'
                gridCols={2}
                choices={['Watts', 'VA', 'CV', 'HP']}
                handleUpdateValue={handleUpdateTypePotency}
                valueSelected={changeInfosCircuit.typePotency}
                />
            </FormGroup>
          </div>
          {changeInfosCircuit.typePotency && (
            <div className='flex justify-center gap-4 my-2'>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'valuePotency' })!} >
                <TextInput
                  placeholder={`Qual o valor em ${changeInfosCircuit.typePotency}?`}
                  onChange={handleValuePotency}
                  value={valueCVAndHP || ''}
                  type="numeric"
                  />
              </FormGroup>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'tension' })!} >
                <TextInput
                  placeholder='Qual o valor da tensao?'
                  onChange={handleValueTension}
                  type="numeric"
                  value={changeInfosCircuit.usageVolts || ''}
                  />
              </FormGroup>
            </div>
          )}
          <div className='flex justify-center gap-4'>
            <div>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'fp' })!} >
                <>
                  <TextInput
                    placeholder='Qual o fp?'
                    onBlur={(e) => {
                      handleUpdateValueFpOnBlur(e);
                      setOnFocus({
                        set: false,
                        where: ''
                      });
                    }}
                    onFocus={() => setOnFocus({
                      set: true,
                      where: 'fp'
                    })}
                    type='numeric'
                    min={0.1}
                    max={1}
                    onChange={handleUpdateValueFpOnChange}
                    value={changeInfosCircuit.fp || ''}
                  >
                  {(onFocus.set && onFocus.where === 'fp') && (
                    <small className='text-xs fixed mt-1 text-red-700 font-bold' >FP abaixo de 1, não precisa de colocar 0.</small>
                  )}
                  </TextInput>
                </>
              </FormGroup>
            </div>
            <div >
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'efficiency' })!} >
                <>
                  <TextInput
                    placeholder='Qual o rendimento?'
                    onChange={handleUpdateEfficiencyOnChange}
                    onBlur={(e) => {
                      handleUpdateEfficiencyOnBlur(e);
                      setOnFocus({
                        set: false,
                        where: ''
                      });
                    }}
                    onFocus={() => setOnFocus({
                      set: true,
                      where: 'efficiency'
                    })}
                    min={0.1}
                    max={1}
                    type='numeric'
                    value={changeInfosCircuit.efficiency || ''}
                  >
                    {(onFocus.set && onFocus.where === 'efficiency') && (
                      <small className='text-xs fixed mt-1 text-red-700 font-bold' >Rendimento abaixo de 1, não precisa de colocar 0.</small>
                    )}
                  </TextInput>
                </>
              </FormGroup>
            </div>
          </div>
          <div className='text-center gap-0 mt-4' >
            <h1 className="text-xl">É trifasico?</h1>
            <small className='text-xs' >(por padrão é não)</small>
          </div>
          <ChooseButton
            gridCols={2}
            choices={['Sim', 'Não']}
            handleUpdateValue={handleUpdateTP}
            valueSelected={changeInfosCircuit.threePhase === true ? 'Sim' : 'Não'}
          />
          <div className='flex justify-center items-center mt-2' >
            <Button disabled={disabledConfirmAddNewCircuit} onClick={handleConfirmAddNewCircuit} >Confirmar</Button>
          </div>
        </div>
      )}

    </div>
  );
}
