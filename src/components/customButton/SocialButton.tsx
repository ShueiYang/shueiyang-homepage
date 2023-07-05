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
          className="text-teal-700 dark:text-teal-400 py-2 px-5 hover:bg-[#fce6cc] dark:hover:bg-sea-d 
          font-semibold rounded-lg hover:underline underline-offset-4 decoration-blue-600 
          dark:decoration-orange-200 sm:ml-[10%]"
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