import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { PATHS } from "./utils/constants";

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATHS.Login} element={<Login />} />
        <Route path={PATHS.Regsiter} element={<Register />} />

        <Route path={PATHS.Home} element={<Home />} />

        <Route path="*" element={<Navigate replace to={PATHS.Home} />} />
      </Routes>
    </div>
  );
};

export default App;
