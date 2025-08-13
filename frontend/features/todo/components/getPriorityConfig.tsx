import { Flag } from "lucide-react";

export const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case "High":
      return {
        className: "text-red-700 border-red-200 bg-red-50",
        icon: <Flag className="h-3 w-3" />,
      };
    case "Medium":
      return {
        className: "text-amber-700 border-amber-200 bg-amber-50",
        icon: <Flag className="h-3 w-3" />,
      };
    case "Low":
      return {
        className: "text-blue-700 border-blue-200 bg-blue-50",
        icon: <Flag className="h-3 w-3" />,
      };
    default:
      return {
        className: "text-slate-700 border-slate-200 bg-slate-50",
        icon: <Flag className="h-3 w-3" />,
      };
  }
};
