import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PrivateRoute({children, ...props}) {
   const token = useSelector(state => state.authentication.token);
   const dispatch = useDispatch();
   if(!token) return <Redirect to="/" />
   return <Route {...props}>
      {children}
   </Route>
}

export default PrivateRoute;