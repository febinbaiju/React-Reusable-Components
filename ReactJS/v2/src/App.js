import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test1 from "./apps/Test1";
import Test2 from "./apps/Test2";
import Test3 from "./apps/Test3";
import Test4 from "./apps/Test4";
import Test5 from "./apps/Test5";
import Test6 from "./apps/Test6";
import Test7 from "./apps/Test7";
import Test8 from "./apps/Test8";
import Test9 from "./apps/Test9";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test1} />
      </Switch>
      <Switch>
        <Route exact path="/test1" component={Test1} />
      </Switch>
      <Switch>
        <Route exact path="/test2" component={Test2} />
      </Switch>
      <Switch>
        <Route exact path="/test3" component={Test3} />
      </Switch>
      <Switch>
        <Route exact path="/test4" component={Test4} />
      </Switch>
      <Switch>
        <Route exact path="/test5" component={Test5} />
      </Switch>
      <Switch>
        <Route exact path="/test6" component={Test6} />
      </Switch>
      <Switch>
        <Route exact path="/test7" component={Test7} />
      </Switch>
      <Switch>
        <Route exact path="/test8" component={Test8} />
      </Switch>
      <Switch>
        <Route exact path="/test9" component={Test9} />
      </Switch>
    </Router>
  );
}

export default App;
