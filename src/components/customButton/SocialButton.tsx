import { IconType } from "react-icons";
import { ButtonProps } from "./Button";

interface SocialButtonProps extends ButtonProps {
  iconName: IconType;
}

const SocialButton = ({ children, iconName, path }: SocialButtonProps) => {
  const Icon = iconName;

  return (
    <div>
      <button
        className="rounded-lg px-5 py-2 font-semibold text-teal-700 decoration-blue-600 
          underline-offset-4 hover:bg-[#fce6cc] hover:underline dark:text-teal-400 dark:decoration-orange-200 
          dark:hover:bg-sea-d sm:ml-[10%]"
      >
        <a
          className="flex items-center"
          href={path}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon className="mr-3 text-xl" />
          <span className="">{children}</span>
        </a>
      </button>
    </div>
  );
};

export default SocialButton;
