interface ButtonProps {
  label?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button = ({
  label,
  isActive,
  icon,
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      id={label}
      type="button"
      disabled={disabled}
      className={`rounded-2xl transition py-2 px-4
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700"
            : ""
        }
        ${
          isActive
            ? "cursor-pointer bg-blue hover:bg-blue-500 dark:bg-blue dark:hover:bg-blue-300"
            : ""
        }
        ${
          !isActive && !disabled
            ? "cursor-pointer bg-blue-300 hover:bg-blue dark:bg-blue-900 dark:hover:bg-blue-800"
            : ""
        }
        ${className}
      `}
    >
      {icon}
      {children}
      {label}
    </button>
  );
};

export default Button;
