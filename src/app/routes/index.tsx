import { CorrectingThePowerFactor } from '@/components/shapeCalcs/CorrectingThePowerFactor';
import InfosTrafoBySecundarySide from '@/components/shapeCalcs/InfosTrafoBySecundarySide';
import { createBrowserRouter } from 'react-router-dom';

export enum routesPath {
  'infosTrafoBySecundarySide' =  '/infosTrafoBySecundarySide',
  'Resistivity' =  '/Resistivity',
  'CorrectingThePowerFactor' =  '/CorrectingThePowerFactor',
}

const router: Array<{path: string; element: JSX.Element}> = [
  {
    path: '*',
    element: <InfosTrafoBySecundarySide />,
  },
  {
    path: '/infosTrafoBySecundarySide',
    element: <InfosTrafoBySecundarySide />,
  },
  {
    path: '/CorrectingThePowerFactor',
    element: <CorrectingThePowerFactor />,
  },
];

export const routerBrowser = createBrowserRouter(router);
