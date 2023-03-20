import { FC, PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const BasicLayout: FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-200">
    <div className={className}>{children}</div>
  </div>
);

export default BasicLayout;
