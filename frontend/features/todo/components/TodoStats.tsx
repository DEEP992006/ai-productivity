"use client";
import { ListTodo, CheckCircle2, TrendingUp } from "lucide-react";

export default function TodoStats({ total, completed }: { total: number; completed: number }) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: total, color: "blue", icon: ListTodo },
    { label: "Completed", value: completed, color: "green", icon: CheckCircle2 },
    { label: "Progress", value: `${progress}%`, color: "purple", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, value, color, icon: Icon }) => (
        <div key={label} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
            </div>
            <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
