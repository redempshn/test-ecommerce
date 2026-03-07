interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const InputGroup = ({ label, children, error }: InputGroupProps) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default InputGroup;
