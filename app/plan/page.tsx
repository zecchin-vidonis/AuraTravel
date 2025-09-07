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
  { id: 1, title: 'Destinazione', component: StepDestination },
  { id: 2, title: 'Quando e Durata', component: StepWhenAndDuration },
  { id: 3, title: 'Budget', component: StepBudget },
  { id: 4, title: 'Tipo di Gruppo', component: StepGroupType },
  { id: 5, title: 'Fascia d\'Età', component: StepGroupAgeRange },
  { id: 6, title: 'Interessi', component: StepInterests },
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
      // Show summary immediately
      setCurrentStep(prev => prev + 1) // Move to summary step
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative text-center z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-white/20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Stiamo creando la tua avventura...
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Stiamo preparando il viaggio perfetto per te con l'AI più avanzata
          </p>
          
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Header */}
      <div className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Pianifica il tuo prossimo viaggio
              </h1>
              <p className="text-white/90 mt-2 text-lg font-medium">
                Passo {currentStep} di {STEPS.length}: {STEPS[currentStep - 1].title}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">
                {Math.round(progress)}%
              </div>
              <div className="text-white/80 text-sm font-medium">
                completato
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="p-8">
              <div className="min-h-[500px]">
                <CurrentStepComponent
                  data={planningData}
                  onUpdate={updatePlanningData}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isFirstStep={currentStep === 1}
                  isLastStep={currentStep === STEPS.length}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Precedente
          </Button>

          <div className="flex gap-3">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  step.id <= currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed(currentStep, planningData)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === STEPS.length ? 'Crea Piano' : 'Avanti'}
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
