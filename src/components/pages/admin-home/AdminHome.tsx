import { FC } from "react";
import { AdminGuard } from "../../../utils/guards";

const AdminHome: FC = () => {
  return (
    <AdminGuard>
      <div>AdminHome</div>
    </AdminGuard>
  );
};

export default AdminHome;
