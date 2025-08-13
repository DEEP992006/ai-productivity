"use client";

import { useEffect, useState } from "react";
import AllGoals from "@/features/goals/components/allGoals";
import Loading from "@/components/Loading";
import { useGoal } from "@/features/goals/GoalStore";
import { fetchUserGoals } from "@/features/goals/utils/fetchGoals";

export default function GoalPage() {
  const { allGoals, setGoal } = useGoal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (allGoals.length) {
      setLoading(false);
      return;
    }
    else{
      fetchUserGoals()
        .then(setGoal)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [allGoals.length, setGoal]);

  if (loading) return <Loading message="Loading your goals..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  return <AllGoals goals={allGoals} />;
}
