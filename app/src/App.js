import "./App.css";
import Landing from "./components/pages/Landing/Landing";
import Admin from "./components/pages/Admin/Admin";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  

  return (
    <Switch>
      <Route path="/landing"><Landing /></Route>
      <Route path="/" exact><Redirect to="/landing"></Redirect></Route>
      <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>
    </Switch>
  );
}

export default App;
