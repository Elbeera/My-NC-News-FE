import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignedIn from "./components/SignedIn";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signedIn">
          <SignedIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
