import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import apps
import './apps/forms/BaseForm'
import BaseForm from './apps/forms/BaseForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <BaseForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
