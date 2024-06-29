import { useState } from 'react';
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
  setEditUsageTension: (value: React.SetStateAction<boolean>) => void;
  editLineUsageTension: boolean;
  changeInfosCircuit: ICircuit;
  handlerUpdateName(event: InputChange): void;
  handlerUpdateQuantity(event: InputChange): void;
  handlerUpdateTypePotency(value: string): void;
  handlerValuePotency(event: InputChange): void;
  handlerValueTension(event: InputChange): void;
  handlerUpdateValueFpOnChange(event: InputChange): void;
  handlerUpdateValueFpOnBlur(event: InputChange): void;
  handlerUpdateEfficiencyOnBlur(event: InputChange): void;
  handlerUpdateEfficiencyOnChange(event: InputChange): void;
  handlerUpdateTP(value: string): void;
  handlerConfirmAddNewCircuit(): void;
  disabledConfirmAddNewCircuit: boolean;
  getErrorMessageByFieldName: ({ fieldName }: MessageError) => string | undefined;
  valueCVAndHP: number;
}

export default function AddNewCircuit({
  setAddNewCircuit,
  addNewCircuit,
  setLineTension,
  lineTension,
  setEditUsageTension,
  editLineUsageTension,
  changeInfosCircuit,
  handlerUpdateName,
  handlerUpdateQuantity,
  handlerUpdateTypePotency,
  handlerValuePotency,
  handlerValueTension,
  handlerUpdateValueFpOnBlur,
  handlerUpdateEfficiencyOnBlur,
  handlerUpdateEfficiencyOnChange,
  handlerUpdateTP,
  handlerConfirmAddNewCircuit,
  disabledConfirmAddNewCircuit,
  getErrorMessageByFieldName,
  handlerUpdateValueFpOnChange,
  valueCVAndHP
}: IProps) {
  const [onFocus, setOnFocus] = useState({
    set: false,
    where: ''
  });

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
            onBlur={() => lineTension ? setEditUsageTension(false) : null}
            disabled={!editLineUsageTension}
            className='justify-center'
          />
          {!editLineUsageTension && (
            <Button variant={'ghost'} onClick={() => setEditUsageTension(true)} >EDITE TENSÃO DE LINHA</Button>
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
                onChange={handlerUpdateName}
              />
            </FormGroup>
            <FormGroup error={getErrorMessageByFieldName({ fieldName: 'quantity' })!} >
              <span className='text-sm' >Quantos circuitos igual a este?</span>
              <TextInput
                type='numeric'
                placeholder='Ex: 0, 1, 2'
                onChange={handlerUpdateQuantity}
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
                handlerUpdateValue={handlerUpdateTypePotency}
                valueSelected={changeInfosCircuit.typePotency}
                />
            </FormGroup>
          </div>
          {changeInfosCircuit.typePotency && (
            <div className='flex justify-center gap-4 my-2'>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'valuePotency' })!} >
                <TextInput
                  placeholder={`Qual o valor em ${changeInfosCircuit.typePotency}?`}
                  onChange={handlerValuePotency}
                  value={valueCVAndHP || ''}
                  type="numeric"
                  />
              </FormGroup>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'tension' })!} >
                <TextInput
                  placeholder='Qual o valor da tensao?'
                  onChange={handlerValueTension}
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
                      handlerUpdateValueFpOnBlur(e);
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
                    onChange={handlerUpdateValueFpOnChange}
                    value={changeInfosCircuit.fp || ''}
                  >
                  {(onFocus.set && onFocus.where === 'fp') && (
                    <small className='text-xs fixed mt-1' >FP abaixo de 1, não precisa de colocar 0.</small>
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
                    onChange={handlerUpdateEfficiencyOnChange}
                    onBlur={(e) => {
                      handlerUpdateEfficiencyOnBlur(e);
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
                      <small className='text-xs fixed mt-1' >Rendimento abaixo de 1, não precisa de colocar 0.</small>
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
            handlerUpdateValue={handlerUpdateTP}
            valueSelected={changeInfosCircuit.threePhase === true ? 'Sim' : 'Não'}
          />
          <div className='flex justify-center items-center mt-2' >
            <Button disabled={disabledConfirmAddNewCircuit} onClick={handlerConfirmAddNewCircuit} >Confirmar</Button>
          </div>
        </div>
      )}

    </div>
  );
}
