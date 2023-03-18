import { FC } from "react";
import { UserGuard } from "../../../utils/guards";

const Home: FC = () => {
  return (
    <UserGuard>
      <div>Home</div>
    </UserGuard>
  );
};

export default Home;
