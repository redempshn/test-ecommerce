import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center grow py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        className="mr-2 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
      />
      <span className="first-letter:uppercase">{label}</span>
    </label>
  );
};

export default Checkbox;
