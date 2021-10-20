import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/User";
import SignedIn from "./components/SignedIn";
import HomePage from "./components/HomePage";

function App() {
  const { user } = useContext(UserContext);

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
