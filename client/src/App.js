import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './themes/darkTheme';
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Others/Login/Login";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Switch>
        <ProtectedRoute path="/admin">
          <Admin />
        </ProtectedRoute>
        <Route path="/login" exact > <Login /> </Route>
        {/* Redirect to /admin if landed on / */}
        <Route path="/" exact > <Redirect to="/admin" /> </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
