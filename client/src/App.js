
import './App.css';
import Register from './components/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/welcome',
      element: <Welcome />
    }
  ])

  return (
    <div className='font-konit w-[90%] mx-auto'>
      <RouterProvider router={router}>
        <Register />
      </RouterProvider>
    </div>
  );
}

export default App;
