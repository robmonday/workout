import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Layout from "./components/Layout";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user">
            <Route path="login" element={<LogInForm />} />
            <Route path="signup" element={<SignUpForm />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
