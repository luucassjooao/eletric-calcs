import InfosTrafoBySecundarySide from '@/components/shapeCalcs/InfosTrafoBySecundarySide';
import { createBrowserRouter } from 'react-router-dom';

export enum routesPath {
  'infosTrafoBySecundarySide' =  '/infosTrafoBySecundarySide'
}

export const router = createBrowserRouter([
  {
    path: '/infosTrafoBySecundarySide',
    element: <InfosTrafoBySecundarySide />,
  },
  {
    path: '*',
    element: <InfosTrafoBySecundarySide />,
  }
]);
