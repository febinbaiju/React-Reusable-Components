import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import apps
import TestForm from './apps/forms/TestForm';
import TestForm2 from './apps/forms/TestForm2';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TestForm />
        </Route>
        <Route path="/2" exact>
          <TestForm2 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
