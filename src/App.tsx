import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { PATHS } from "./utils/constants";

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATHS.Login} element={<Login />} />
        <Route path={PATHS.Regsiter} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
