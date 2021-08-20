import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Test1 from './apps/Test1';
import Test2 from './apps/Test2';
import Test3 from './apps/Test3';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test1} />
      </Switch>
      <Switch>
        <Route exact path="/test2" component={Test2} />
      </Switch>
      <Switch>
        <Route exact path="/test3" component={Test3} />
      </Switch>
    </Router>
  );
}

export default App;
