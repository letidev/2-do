import { FC } from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const OutlineButton: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-indigo-700 bg-transparent border border-transparent border-indigo-500 rounded-md shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {text}
    </button>
  );
};

export default OutlineButton;
