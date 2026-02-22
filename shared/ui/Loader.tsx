const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-full bg-background text-foreground">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
