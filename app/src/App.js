import "./App.css";
import Landing from "./components/pages/Landing/Landing";
import Admin from "./components/pages/Admin/Admin";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/defaultTheme';

function App() {


  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* <Route path="/landing"><Landing /></Route> */}
        <Route path="/landing"><Admin /></Route>
        <Route path="/" exact><Redirect to="/landing"></Redirect></Route>
        <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
