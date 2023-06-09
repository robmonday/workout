import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { StateContext } from "./components/StateProvider";

import Layout from "./components/Layout";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import Start from "./components/Start";
import DataEntryMode from "./components/MyData";
import WorkoutMode from "./components/WorkoutMode";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import EmailConfirm from "./components/EmailConfirm";
import ForgotPassword from "./components/ForgotPassword";
import Notifications from "./components/Notifications";
import Badges from "./components/Badges";
import Social from "./components/Social";
import SeedDelete from "./components/SeedDelete";

function App(): JSX.Element {
  const state = useContext(StateContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LogInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="home" element={<Home />} />
          <Route
            path="start"
            element={state.token ? <Start /> : <LogInForm />}
          />
          <Route
            path="data"
            element={state.token ? <DataEntryMode /> : <LogInForm />}
          />
          <Route
            path="workout"
            element={state.token ? <WorkoutMode /> : <LogInForm />}
          />
          <Route
            path="badges"
            element={state.token ? <Badges /> : <LogInForm />}
          />
          <Route
            path="dashboard"
            element={state.token ? <Dashboard /> : <LogInForm />}
          />
          <Route
            path="settings"
            element={state.token ? <Settings /> : <LogInForm />}
          />
          <Route
            path="notifications"
            element={state.token ? <Notifications /> : <LogInForm />}
          />

          <Route
            path="emailconfirm"
            element={state.token ? <EmailConfirm /> : <LogInForm />}
          />
          <Route
            path="social"
            element={state.token ? <Social /> : <LogInForm />}
          />
          <Route
            path="deleteseed"
            element={state.token ? <SeedDelete /> : <LogInForm />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
