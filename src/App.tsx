import { ThemeProvider } from './app/context/ThemeProvider';
import SecondaryTransformerInformations from './components/shapeCalcs/secondaryTransformerInformation';


function App() {

  return (
    <ThemeProvider>
      <SecondaryTransformerInformations />
    </ThemeProvider>
  );
}

export default App;
