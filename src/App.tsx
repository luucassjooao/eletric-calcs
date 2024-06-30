import { ThemeProvider } from './app/context/ThemeProvider';
import InfosTrafoBySecundarySide from './components/shapeCalcs/InfosTrafoBySecundarySide';


function App() {

  return (
    <ThemeProvider>
      <InfosTrafoBySecundarySide />
    </ThemeProvider>
  );
}

export default App;
