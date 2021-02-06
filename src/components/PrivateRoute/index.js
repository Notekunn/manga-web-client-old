import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLogged } from '../../features/auth/authSlice';

function PrivateRoute({ children, ...props }) {
  const isLogged = useSelector(selectLogged);
  if (!isLogged) return <Redirect to="/" />
  return <Route {...props}>
    {children}
  </Route>
}

export default PrivateRoute;
