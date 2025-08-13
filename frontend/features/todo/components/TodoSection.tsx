"use client";
import { ReactNode } from "react";

type TodoSectionProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

export default function TodoSection({ title, icon, children }: TodoSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}
