import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/User";
import SignedIn from "./components/SignedIn";
import HomePage from "./components/HomePage";

function App() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
          {user !== "" && <Redirect to="/signedIn" />}
        </Route>
        <Route exact path="/signedIn">
          <SignedIn user={user} setUser={setUser} />
          {user === "" && <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
