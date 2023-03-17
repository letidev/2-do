import { FC, PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const BasicLayout: FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <div className="flex flex-col h-screen w-full justify-center items-center bg-slate-200">
    <div className={className}>{children}</div>
  </div>
);

export default BasicLayout;
