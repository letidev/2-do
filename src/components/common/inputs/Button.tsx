import { FC } from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {text}
    </button>
  );
};

export default Button;
