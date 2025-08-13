// components/StatCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgColor?: string; 
  Color?: string;   
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = "bg-blue-100",
  Color = "text-blue-600",
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className={cn("text-2xl font-bold text-slate-900",Color)}>{value}</p>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconBgColor
          )}
        >
          <span className={cn("w-6 h-6", Color)}>{icon}</span>
        </div>
      </div>
    </div>
  );
};
