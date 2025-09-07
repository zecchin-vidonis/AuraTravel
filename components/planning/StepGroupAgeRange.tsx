'use client'

import { Button } from '@/components/ui/button'
import { PlanningData } from '@/app/plan/page'
import { Users } from 'lucide-react'

interface StepGroupAgeRangeProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const AGE_RANGES = [
  {
    id: '18-25',
    name: '18-25',
    description: 'Giovani adulti e studenti',
    emoji: '🎓',
    vibe: 'Energetico e sociale',
    color: 'blue'
  },
  {
    id: '26-40',
    name: '26-40',
    description: 'Giovani professionisti',
    emoji: '💼',
    vibe: 'Attivo e ambizioso',
    color: 'green'
  },
  {
    id: '40-60',
    name: '40-60',
    description: 'Adulti affermati',
    emoji: '🏆',
    vibe: 'Raffinato ed esperto',
    color: 'purple'
  },
  {
    id: '60+',
    name: '60+',
    description: 'Viaggiatori maturi',
    emoji: '🌅',
    vibe: 'Saggio e rilassato',
    color: 'orange'
  },
  {
    id: 'mixed',
    name: 'Età miste',
    description: 'Tutte le generazioni insieme',
    emoji: '🌈',
    vibe: 'Diverso e inclusivo',
    color: 'pink'
  }
]

export function StepGroupAgeRange({ data, onUpdate, onNext }: StepGroupAgeRangeProps) {
  const handleAgeRangeSelect = (ageRange: string) => {
    onUpdate({ groupAgeRange: ageRange })
  }

  const getAgeRangeInfo = (ageRangeId: string) => {
    return AGE_RANGES.find(a => a.id === ageRangeId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual è l'atmosfera del tuo gruppo?</h2>
        <p className="text-gray-600">Aiutaci a capire l'energia e le preferenze del tuo gruppo</p>
      </div>

      <div className="space-y-3">
        {AGE_RANGES.map((ageRange) => {
          const isSelected = data.groupAgeRange === ageRange.id
          
          return (
            <button
              key={ageRange.id}
              onClick={() => handleAgeRangeSelect(ageRange.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? `border-${ageRange.color}-500 bg-${ageRange.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? `bg-${ageRange.color}-100` : 'bg-gray-100'
                }`}>
                  <span className="text-2xl">{ageRange.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{ageRange.name}</h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{ageRange.description}</p>
                  <p className={`text-sm font-medium ${
                    isSelected ? `text-${ageRange.color}-700` : 'text-gray-500'
                  }`}>
                    {ageRange.vibe}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {data.groupAgeRange && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">
              Atmosfera del gruppo: {getAgeRangeInfo(data.groupAgeRange)?.name} - {getAgeRangeInfo(data.groupAgeRange)?.vibe}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.groupAgeRange}
          size="lg"
          className="px-8"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
