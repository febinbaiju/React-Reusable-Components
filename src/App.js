import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import apps
import TestForm from './apps/forms/TestForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TestForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
