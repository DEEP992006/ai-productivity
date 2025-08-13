// app/(root)/signin/page.tsx
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "@/auth";

export default async function SignIn() {
  // Check if user session exists
  const session = await auth();

  // If session exists → redirect to todos
  if (session?.user) {
    permanentRedirect("./todos");
  }

  // Sign in with GitHub action
  const handleGitHubSignIn = async () => {
    "use server";
    await signIn("github", { redirectTo: "/goals" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-2">Sign in to continue your journey</p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Sign In</h2>
              <p className="text-slate-600 mt-2">Choose your preferred method</p>
            </div>
            
            {/* GitHub Sign In */}
            <form action={handleGitHubSignIn}>
              <Button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl flex items-center justify-center gap-3 text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>
            </form>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
             
            </div>
  
          </div>
        </div>
      </div>
    </div>
  );
}