import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Test from './Test';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
