import NewGoalButton from '@/features/goals/components/NewGoalButton'
import React from 'react'

const GoalHeader = () => {
  return (
    <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight">
                Goals Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Track your progress and achieve your targets
              </p>
            </div>

            <div className="flex items-center gap-4">
              
              <NewGoalButton />
            </div>
          </div>
        </div>
  )
}

export default GoalHeader