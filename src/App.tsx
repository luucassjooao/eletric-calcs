import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './app/context/ThemeProvider';
import { Header } from './components/Header';
import { routerBrowser } from './app/routes';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <RouterProvider router={routerBrowser} />
    </ThemeProvider>
  );
}

export default App;
