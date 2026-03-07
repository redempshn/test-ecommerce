import { FaLongArrowAltUp } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="-w-full mx-auto border border-gray-200 rounded-lg p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow mb-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconBg}`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1.5">
          {changeType === "up" && (
            <FaLongArrowAltUp className="h-3.5 w-3.5 text-green-600" />
          )}
          {changeType === "down" && (
            <FaArrowTrendDown className="h-3.5 w-3.5 text-destructive" />
          )}
          <span
            className={`text-xs font-medium ${changeType === "up" ? "text-green-600" : changeType === "down" ? "text-destructive" : "text-muted-foreground"}`}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
