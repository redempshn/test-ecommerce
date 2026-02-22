const Divider = () => {
  return (
    <div className="flex items-center gap-4 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-sm text-gray-500 font-medium">OR</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
};

export default Divider;
