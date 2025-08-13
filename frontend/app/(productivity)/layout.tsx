"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  CheckSquare,
  Timer,
  Target,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Calendar,
  BarChart3,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Tasks", icon: CheckSquare, href: "/todos" },
  { label: "Focus", icon: Timer, href: "/pomodoro" },
  { label: "Goals", icon: Target, href: "/goals" },
  { label: "Projects", icon: FolderKanban, href: "/projects" },
  { label: "Habits", icon: BarChart3, href: "/habits" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shadow-sm",
          collapsed ? "w-20 min-w-[5rem]" : "w-72 min-w-[18rem]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">2nd Mind</h1>
                <p className="text-xs text-slate-500">Productivity Suite</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md mx-auto">
              <Brain className="w-5 h-5 text-white" />
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 hover:bg-slate-100 rounded-full ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  collapsed ? "justify-center px-2" : "",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm" 
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-slate-500"
                )} />
                {!collapsed && (
                  <span className="truncate text-base">{label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-3 my-2" />

        {/* Settings & Profile */}
        <div className="p-3 space-y-2">
          <Link
            href="/settings"
            prefetch={true}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              collapsed ? "justify-center px-2" : "",
              pathname === "/settings"
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Settings className={cn(
              "w-5 h-5 flex-shrink-0",
              pathname === "/settings" ? "text-blue-600" : "text-slate-500"
            )} />
            {!collapsed && (
              <span className="truncate text-base">Settings</span>
            )}
          </Link>
          
          <Link
            href="/profile"
            prefetch={true}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              collapsed ? "justify-center px-2" : "",
              pathname === "/profile"
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <User className={cn(
              "w-5 h-5 flex-shrink-0",
              pathname === "/profile" ? "text-blue-600" : "text-slate-500"
            )} />
            {!collapsed && (
              <span className="truncate text-base">Profile</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
        {children}
      </main>
    </div>
  );
}