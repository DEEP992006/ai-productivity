// src/constants/statusConfig.ts
import React from "react";
import { CheckCircle2, Clock, Circle } from "lucide-react";

export type StatusType = "Completed" | "In Progress" | "Not Started";

export const STATUS_OPTIONS: StatusType[] = [
  "Not Started",
  "In Progress",
  "Completed",
];

export const statusConfig: Record<
  StatusType,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    icon: React.ReactNode;
    ring: string;
  }
> = {
  Completed: {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    ring: "ring-emerald-100",
  },
  "In Progress": {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    ring: "ring-amber-100",
  },
  "Not Started": {
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-200",
    icon: <Circle className="w-4 h-4 text-slate-500" />,
    ring: "ring-slate-100",
  },
};
