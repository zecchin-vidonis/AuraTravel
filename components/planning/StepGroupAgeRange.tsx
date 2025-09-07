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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Qual è l'atmosfera del tuo gruppo?</h2>
        <p className="text-white/80 font-medium">Aiutaci a capire l'energia e le preferenze del tuo gruppo</p>
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
                  ? 'border-blue-500 bg-blue-500/20 backdrop-blur-sm'
                  : 'border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-blue-500/30' : 'bg-white/10'
                }`}>
                  <span className="text-2xl">{ageRange.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{ageRange.name}</h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-white/80 mb-1">{ageRange.description}</p>
                  <p className={`text-sm font-medium ${
                    isSelected ? 'text-white' : 'text-white/70'
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
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">
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
          className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
