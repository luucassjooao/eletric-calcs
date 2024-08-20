import { ISumsValueAndIllustration } from '../../types';

interface IProps {
  sumsIllustrationAndValue: ISumsValueAndIllustration;
}

export function AllFormulas({ sumsIllustrationAndValue }: IProps) {
  return (
    <div className='mx-auto bg-muted/50 p-4 rounded-md h-fit max-[815px]:mt-4'>
      <h1 className='text-center mb-4 font-bold text-xl'>Fórmulas</h1>

      <h3>θgeral: {sumsIllustrationAndValue.thetaGeral.value}</h3>
      <h5 className="text-pink-500" >θgeral: {sumsIllustrationAndValue.thetaGeral.illustration}</h5>

      <h3>cosθgeral: {sumsIllustrationAndValue.CosThetaGeral.value}°</h3>
      <h5 className="text-blue-300" >{sumsIllustrationAndValue.CosThetaGeral.illustration}</h5>

      <h3 className='text-green-500' >{sumsIllustrationAndValue.tgThetaNew}</h3>
      <h3 className='text-green-600' >{sumsIllustrationAndValue.tgNotFininshed}</h3>

      <h3>Qnovo: {sumsIllustrationAndValue.Qnew.value}VAR</h3>
      <h5 className="text-blue-400" >{sumsIllustrationAndValue.Qnew.illustration}</h5>

      <h3>Qcapacitivo: {sumsIllustrationAndValue.Qcapacitive.value}VAR</h3>
      <h5 className="text-purple-300" >{sumsIllustrationAndValue.Qcapacitive.illustration}</h5>

      <h3>Potência capacitiva por fase: {sumsIllustrationAndValue.potencyCapacitivePerPhase.value}VAR</h3>
      <h5 className="text-purple-400" >{sumsIllustrationAndValue.potencyCapacitivePerPhase.illustration}</h5>

      <h3>Xc: {sumsIllustrationAndValue.Xc.value}Ω/-90°</h3>
      <h5 className="text-yellow-300" >{sumsIllustrationAndValue.Xc.illustration}</h5>

      <h3>Capacitores: {sumsIllustrationAndValue.Capacitor.value}F</h3>
      <h5 className="text-pink-400" >{sumsIllustrationAndValue.Capacitor.illustration}</h5>

      <h3>Tensão para os capacitores: {sumsIllustrationAndValue.tensionForCapacitor.value}V</h3>
      <h5 className="text-purple-600" >{sumsIllustrationAndValue.tensionForCapacitor.illustration}</h5>
    </div>
  );
}
