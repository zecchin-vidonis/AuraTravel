'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StepDestination } from '@/components/planning/StepDestination'
import { StepWhenAndDuration } from '@/components/planning/StepWhenAndDuration'
import { StepBudget } from '@/components/planning/StepBudget'
import { StepGroupType } from '@/components/planning/StepGroupType'
import { StepGroupAgeRange } from '@/components/planning/StepGroupAgeRange'
import { StepInterests } from '@/components/planning/StepInterests'
import { PlanningSummary } from '@/components/planning/PlanningSummary'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PlanningData {
  destination: string
  when: string
  duration: number
  budget: string
  budgetAmount?: number
  groupType: string
  groupAgeRange: string
  interests: string[]
}

const STEPS = [
  { id: 1, title: 'Destination', component: StepDestination },
  { id: 2, title: 'When & How Long', component: StepWhenAndDuration },
  { id: 3, title: 'Budget', component: StepBudget },
  { id: 4, title: 'Group Type', component: StepGroupType },
  { id: 5, title: 'Group Age Range', component: StepGroupAgeRange },
  { id: 6, title: 'Interests', component: StepInterests },
]

export default function PlanPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [planningData, setPlanningData] = useState<PlanningData>({
    destination: '',
    when: '',
    duration: 7,
    budget: '',
    budgetAmount: undefined,
    groupType: '',
    groupAgeRange: '',
    interests: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const updatePlanningData = (updates: Partial<PlanningData>) => {
    setPlanningData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Show summary and start loading
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const resetPlanning = () => {
    setCurrentStep(1)
    setPlanningData({
      destination: '',
      when: '',
      duration: 7,
      budget: '',
      budgetAmount: undefined,
      groupType: '',
      groupAgeRange: '',
      interests: [],
    })
    setIsLoading(false)
  }

  const progress = (currentStep / STEPS.length) * 100

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Building your adventure...</h2>
          <p className="text-gray-600">We're crafting the perfect trip just for you</p>
        </div>
      </div>
    )
  }

  if (currentStep > STEPS.length) {
    return (
      <PlanningSummary 
        data={planningData} 
        onStartOver={resetPlanning}
      />
    )
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plan your next trip</h1>
              <p className="text-gray-600 mt-1">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</p>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl p-8 shadow-lg">
            <div className="min-h-[400px]">
              <CurrentStepComponent
                data={planningData}
                onUpdate={updatePlanningData}
                onNext={nextStep}
                onPrev={prevStep}
                isFirstStep={currentStep === 1}
                isLastStep={currentStep === STEPS.length}
              />
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step.id <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed(currentStep, planningData)}
            className="flex items-center gap-2"
          >
            {currentStep === STEPS.length ? 'Create Plan' : 'Next'}
            {currentStep < STEPS.length && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

function canProceed(step: number, data: PlanningData): boolean {
  switch (step) {
    case 1:
      return data.destination.length > 0
    case 2:
      return data.when.length > 0 && data.duration > 0
    case 3:
      return data.budget.length > 0
    case 4:
      return data.groupType.length > 0
    case 5:
      return data.groupAgeRange.length > 0
    case 6:
      return data.interests.length > 0
    default:
      return false
  }
}
