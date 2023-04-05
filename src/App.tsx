import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import Main from "./components/Main";
import DataEntryMode from "./components/DataEntryMode";
import WorkoutMode from "./components/WorkoutMode";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LogInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgot" element={<SignUpForm />} />
          <Route path="home" element={<Home />} />
          <Route path="main" element={<Main />} />
          <Route path="data" element={<DataEntryMode />} />
          <Route path="workout" element={<WorkoutMode />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
