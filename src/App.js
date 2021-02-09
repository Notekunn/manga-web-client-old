import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminRoute from './routes/Admin';
import message from 'antd/lib/message';
import './App.css';
message.info({
  content: 'Chào mừng bạn đến với manga app',
  duration: 5,
  key: 'introduction',
});
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
