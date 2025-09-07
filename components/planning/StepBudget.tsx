'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlanningData } from '@/app/plan/page'
import { DollarSign, Backpack, Coffee, Crown } from 'lucide-react'

interface StepBudgetProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const BUDGET_LEVELS = [
  {
    id: 'backpacker',
    name: 'Zaino in Spalla',
    icon: Backpack,
    description: 'Avventure economiche',
    emoji: '🎒',
    range: '$20-50/day',
    color: 'green'
  },
  {
    id: 'easygoing',
    name: 'Tranquillo',
    icon: Coffee,
    description: 'Comfortevole senza spendere troppo',
    emoji: '☕',
    range: '$50-150/day',
    color: 'blue'
  },
  {
    id: 'indulgent',
    name: 'Indulgente',
    icon: Crown,
    description: 'Esperienze di lusso e soggiorni premium',
    emoji: '👑',
    range: '$150+/day',
    color: 'purple'
  }
]

export function StepBudget({ data, onUpdate, onNext }: StepBudgetProps) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customAmount, setCustomAmount] = useState(data.budgetAmount || '')

  const handleBudgetSelect = (budget: string) => {
    onUpdate({ budget })
    setShowCustomInput(false)
  }

  const handleCustomAmount = (amount: string) => {
    setCustomAmount(amount)
    onUpdate({ 
      budget: 'custom',
      budgetAmount: parseInt(amount) || 0
    })
  }

  const getBudgetInfo = (budgetId: string) => {
    return BUDGET_LEVELS.find(b => b.id === budgetId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual è il tuo stile di budget?</h2>
        <p className="text-gray-600">Scegli il tuo livello di comfort e preferenza di spesa</p>
      </div>

      <div className="space-y-4">
        {BUDGET_LEVELS.map((budget) => {
          const IconComponent = budget.icon
          const isSelected = data.budget === budget.id
          
          return (
            <button
              key={budget.id}
              onClick={() => handleBudgetSelect(budget.id)}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? `border-${budget.color}-500 bg-${budget.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? `bg-${budget.color}-100` : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    isSelected ? `text-${budget.color}-600` : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{budget.emoji}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{budget.description}</p>
                  <p className={`text-sm font-medium ${
                    isSelected ? `text-${budget.color}-700` : 'text-gray-500'
                  }`}>
                    {budget.range}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}

        {/* Custom Budget Option */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Budget Personalizzato</h3>
                <p className="text-gray-600">Ho un importo specifico in mente</p>
              </div>
            </div>
          </button>

          {showCustomInput && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 font-medium">Il mio budget è:</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  placeholder="Inserisci importo"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="flex-1"
                />
                <span className="text-gray-600">al giorno</span>
              </div>
              {customAmount && (
                <p className="text-sm text-gray-500 mt-2">
                  Totale per {data.duration} giorni: ${(parseInt(customAmount) * data.duration).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {data.budget && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">
              {data.budget === 'custom' 
                ? `Budget personalizzato: $${customAmount}/giorno`
                : `${getBudgetInfo(data.budget)?.name} style (${getBudgetInfo(data.budget)?.range})`
              }
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.budget || (data.budget === 'custom' && !customAmount)}
          size="lg"
          className="px-8"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
