import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
}

const Select = ({ options, defaultValue, onChange, label }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value,
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div ref={selectRef} className="relative">
      {/* Кнопка селекта */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between
          px-4 py-2.5 
          bg-white border rounded-lg
          text-sm font-medium text-gray-700
          transition-all duration-200
          hover:border-blue-500 hover:shadow-sm
          ${isOpen ? "border-blue-500 shadow-sm ring-2 ring-blue-100" : "border-gray-300"}
        `}
      >
        <div className="flex items-center">
          <span className="text-base">{selectedOption?.label}</span>
          {label && <span className="ml-2">{label}</span>}
        </div>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full text-left px-4 py-2.5
                text-sm transition-colors duration-150
                ${
                  option.value === selectedValue
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
