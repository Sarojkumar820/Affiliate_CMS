import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Loader from './custom/index';
import routes from './AllRoutes';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const router = createBrowserRouter(routes);
  return loading ? <Loader /> : <RouterProvider router={router} />;
}

export default App;
