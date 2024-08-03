import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './app/context/ThemeProvider';
import { Header } from './components/Header';
import { router } from './app/routes';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
