import { ChangeEvent } from 'react';
import AddNewCircuit from './components/addNewCircuit';
import ViewInfosCircuit from './components/viewInfosCircuit';
import { cn } from '@/app/libs/utils';
import { AllFormulas } from './components/allFormulas';
import { useInfosTrafoBySecundarySide } from './useInfosTrafoBySecundarySide';

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export default function InfosTrafoBySecundarySide() {
  const {
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
  } = useInfosTrafoBySecundarySide();

  return (
    <div className='mt-10 max-[815px]:mx-auto mb-14' >
      <h1 className='text-center mb-8 font-bold text-xl' >
        Conseguindo informações do trafo a partir de informações do secundário
      </h1>
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

        {circuits.length > 0 && <AllFormulas sumsIllustrationAndValue={sumsIllustrationAndValue} />}
      </div>
    </div>
  );
}
