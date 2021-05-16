import "./App.css";
import Home from "./components/Main";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
