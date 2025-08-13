"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

type TodoHeaderProps = {
  searchText: string;
  setSearchText: (value: string) => void;
  openDialog: () => void;
  totalTodos: number;
};

export default function TodoHeader({ searchText, setSearchText, openDialog, totalTodos }: TodoHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight">
            Todo Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Organize your tasks and boost productivity
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {totalTodos > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search your todos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white shadow-sm"
              />
            </div>
          )}
          <Button
            onClick={openDialog}
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl transition-all duration-300 px-8 py-4 rounded-xl font-semibold"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Todo
          </Button>
        </div>
      </div>
    </div>
  );
}
