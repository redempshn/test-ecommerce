interface BadgeProps {
  totalUniqueItems: number;
}

const Badge = ({ totalUniqueItems }: BadgeProps) => {
  return (
    <div className="absolute -top-1.25 -right-3.5 overflow-hidden bg-red-600 rounded-full h-4 w-4 text-center text-sm">
      <p className="text-xs text-white">{totalUniqueItems}</p>
    </div>
  );
};

export default Badge;
