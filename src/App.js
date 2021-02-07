import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminRoute from './routes/Admin';
import './App.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AdminRoute />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
