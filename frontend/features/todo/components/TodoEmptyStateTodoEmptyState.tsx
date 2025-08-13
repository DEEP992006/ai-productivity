"use client";
import { Button } from "@/components/ui/button";
import { ListTodo, PlusCircle } from "lucide-react";

export default function TodoEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <ListTodo className="w-10 h-10 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
            <PlusCircle className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Ready to get organized?</h3>
        <p className="text-slate-600 mb-8">Create your first todo and start building productive habits.</p>
        <Button onClick={onCreate} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg">
          <ListTodo className="w-6 h-6 mr-3" />
          Create Your First Todo
        </Button>
      </div>
    </div>
  );
}
