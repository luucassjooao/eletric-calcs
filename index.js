const s = 5 * 1.014 * 736 / (110 * 0.9 * 0.875); // Cálculo de sW
const c = Math.acos(0.9);
const d = s * Math.cos(c); // Cálculo final utilizando cosseno em radianos

const b = s * - Math.sin(c);
const x = Math.sqrt(Math.pow(251.1, 2) + Math.pow(-56.22, 2));
const value = -225 / 728.54; // Calcula a divisão
const radians = Math.atan(value); // Calcula o arco tangente em radianos
const t = radians * (180 / Math.PI); // Converte de radianos para graus
const q = t * (Math.PI/180);

const u = Math.cos(q);

const i = Math.sqrt(3) * 110 * 257;
const z = Math.sqrt(3) * 208 * 762.67;

const r = z*0.95;

console.log({
  s, c, d, b, x, t, u, i, z, r, q
});


  // const [inputWatts, setInputWatts] = useState('0');
  // const [inputVolts, setInputVolts] = useState(0);
  // const [inputfp, setInputfp] = useState('0');
  // const [inputRendi, setInputRendi] = useState('1');

  // const ACurrent = w/(inputVolts*fp*r*Math.sqrt(3));

  // const radians = Math.acos(fp);
  // const degrees = radians * (180/Math.PI);
  // const horizontalCurrent = ACurrent * Math.cos(radians)
  // const verticalCurrent = ACurrent * -Math.sin(radians);

  // raiz de quadrada da corrente horizontal expoente 2
  // mais corrente vertical expoente 2
  // const totalCurrent = Math.sqrt(
  //   Math.pow(horizontalCurrent, 2) +
  //   Math.pow(verticalCurrent, 2)
  // );

  // const tanDegree = Math.atan(verticalCurrent / horizontalCurrent) * (180/Math.PI);
  // const tanRadians = tanDegree * (Math.PI/180);

  // const FpSystem = Math.cos(tanRadians);

  // const potencySs = Math.sqrt(3) * inputLineVolts * w;
  // const potencyP = potencySs * FpSystem;
  // const potencyQ = Math.sqrt(
  //   Math.pow(potencySs, 2) +
  //   Math.pow(potencyP, 2)
  // );
