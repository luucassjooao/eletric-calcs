import { ISumsValueAndIllustration } from '../../types';

interface IProps {
  sumsIllustrationAndValue: ISumsValueAndIllustration;
}

export function AllFormulas({ sumsIllustrationAndValue }: IProps) {
  return (
    <div className='mx-auto bg-muted/50 p-4 rounded-md h-fit max-[815px]:mt-4' >
    <h1 className='text-center mb-4 font-bold text-xl' >Fórmulas</h1>

    <h1>Tensão de fase (Secundário): {sumsIllustrationAndValue.tensionPhaseSecundary.value}A</h1>
    <h5 className="text-pink-500" >{sumsIllustrationAndValue.tensionPhaseSecundary.illustration}</h5>

    <h1>Corrente horizontal dos circuitos: {sumsIllustrationAndValue.horizontalCurrent.value}A</h1>
    <h5 className="text-blue-300" >{(sumsIllustrationAndValue.horizontalCurrent?.illustration as string[]).join('+')}</h5>

    <h1>Corrente Vertical dos circuitos: {sumsIllustrationAndValue.verticalCurrent.value}A</h1>
    <h5 className="text-blue-400" >{(sumsIllustrationAndValue.verticalCurrent?.illustration as string[]).join('+')}</h5>

    <h3>Corrente total (Secundário): {sumsIllustrationAndValue.totalCurrentSecundary.value}A</h3>
    <h5 className='text-purple-300' >{sumsIllustrationAndValue.totalCurrentSecundary.illustration}</h5>

    <h3>Corrente de linha (Secundário): {sumsIllustrationAndValue.totalCurrentSecundary.value} φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>
    <h5 className='text-purple-400' >{sumsIllustrationAndValue.tanTotalCurrentLineSecundary.illustration}</h5>

    <h3>Fator de potência do sistema (Secundário): {sumsIllustrationAndValue.FPSystem.value}</h3>
    <h5 className='text-yellow-300' >{sumsIllustrationAndValue.FPSystem.illustration}</h5>

    <h1>Tensão de fase (Primário): {sumsIllustrationAndValue.tensionPhasePrimary.value}A</h1>
    <h5 className="text-pink-500" >{sumsIllustrationAndValue.tensionPhasePrimary.illustration}</h5>

    <h1>Corrente de linha (Primário): {sumsIllustrationAndValue.currentLinePrimary.value}A</h1>
    <h5 className="text-purple-400" >{sumsIllustrationAndValue.currentLinePrimary.illustration}</h5>

    <h3>Potência Aparente Secundário (Ss): {sumsIllustrationAndValue.apparentPotencyS.value}W φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>
    <h5 className="text-green-300" >{sumsIllustrationAndValue.apparentPotencyS.illustration}</h5>
    <h3>Potência aparente do Primário (Sp): {sumsIllustrationAndValue.apparentPotencyS.value}W φ{sumsIllustrationAndValue.tanDegreeCurrentSecundary}°</h3>

    <h3>Potência Ativa Pp: {sumsIllustrationAndValue.activePotencyP.value}W</h3>
    <h5 className="text-green-400" >{sumsIllustrationAndValue.activePotencyP.illustration}</h5>

    <h3>Potência Reatica Qp: {sumsIllustrationAndValue.reactivePotencyQ.value}W</h3>
    <h5 className="text-green-500" >{sumsIllustrationAndValue.reactivePotencyQ.illustration}</h5>

  </div>
  );
}
