import { cn } from '@/app/libs/utils';
import { useCorrectingThePowerFactor } from './useCorrectingThePowerFactor';
import { ViewInfosCircuits } from './components/viewInfosCircuits';
import { AllFormulas } from './components/allFormulas';
import { AddNewCircuit } from '@/components/addNewCircuit';

export function CorrectingThePowerFactor() {
  const {
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
    sumsIllustrationAndValue
  } = useCorrectingThePowerFactor();

  return (
    <div className='mt-10 max-[815px]:mx-auto mb-14' >
      <h1 className='text-center mb-8 font-bold text-xl' >
        Corrigindo o fator de potência com capacitores
      </h1>
      <div className={'flex max-[815px]:flex-col mt-0'} >
        <div className={cn(circuits.length > 0 ? 'max-w-[570px] hover:overflow-y-auto h-screen max-[815px]:h-auto' : 'w-fit', 'mx-auto max-[815px]:w-fit')} >
          <AddNewCircuit
            setAddNewCircuit={setAddNewCircuit}
            addNewCircuit={addNewCircuit}
            setTension={setTensionVfn}
            tension={tensionVfn}
            changeInfosCircuit={changeInfosCircuit}
            handleUpdateName={handleUpdateName}
            handleUpdateQuantity={handleUpdateQuantity}
            handleUpdateTypePotency={handleUpdateTypePotency}
            handleValuePotency={handleValuePotency}
            handleUpdateValueFpOnBlur={handleUpdateValueFpOnBlur}
            handleUpdateValueFpOnChange={handleUpdateValueFpOnChange}
            handleUpdateEfficiencyOnChange={handleUpdateEfficiencyOnChange}
            handleUpdateEfficiencyOnBlur={handleUpdateEfficiencyOnBlur}
            handleConfirmAddNewCircuit={handleConfirmAddNewCircuit}
            disabledConfirmAddNewCircuit={!!disabledConfirmAddNewCircuit}
            getErrorMessageByFieldName={getErrorMessageByFieldName}
            valueCVAndHP={valueCVAndHP}
            placeholderEditTension='EDITAR TENSÃO FASE NEUTRO'
            placeholderTension='Qual a tensão fase neutro?'
            styleAddNewCircuit='CorrectingThePowerFactor'
          />
          {circuits.length > 0 && (
            <ViewInfosCircuits circuits={circuits} />
          )}
        </div>

        {circuits.length > 0 && <AllFormulas sumsIllustrationAndValue={sumsIllustrationAndValue} />}
      </div>
    </div>
  );
}
