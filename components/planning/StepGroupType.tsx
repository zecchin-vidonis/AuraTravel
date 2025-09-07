'use client'

import { Button } from '@/components/ui/button'
import { PlanningData } from '@/app/plan/page'
import { User, Users, Heart, Baby } from 'lucide-react'

interface StepGroupTypeProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const GROUP_TYPES = [
  {
    id: 'solo',
    name: 'Solo',
    icon: User,
    description: 'Solo io, me stesso e io',
    emoji: '🧳',
    color: 'blue'
  },
  {
    id: 'friends',
    name: 'Amici',
    icon: Users,
    description: 'Avventura con la mia squadra',
    emoji: '👥',
    color: 'green'
  },
  {
    id: 'couple',
    name: 'Coppia',
    icon: Heart,
    description: 'Fuga romantica per due',
    emoji: '💕',
    color: 'pink'
  },
  {
    id: 'family',
    name: 'Famiglia',
    icon: Baby,
    description: 'Divertimento per tutta la famiglia',
    emoji: '👨‍👩‍👧‍👦',
    color: 'orange'
  }
]

export function StepGroupType({ data, onUpdate, onNext }: StepGroupTypeProps) {
  const handleGroupTypeSelect = (groupType: string) => {
    onUpdate({ groupType })
  }

  const getGroupTypeInfo = (groupId: string) => {
    return GROUP_TYPES.find(g => g.id === groupId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Chi ti accompagna?</h2>
        <p className="text-white/80 font-medium">Raccontaci dei tuoi compagni di viaggio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GROUP_TYPES.map((group) => {
          const IconComponent = group.icon
          const isSelected = data.groupType === group.id
          
          return (
            <button
              key={group.id}
              onClick={() => handleGroupTypeSelect(group.id)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/20 backdrop-blur-sm'
                  : 'border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isSelected ? 'bg-blue-500/30' : 'bg-white/10'
                }`}>
                  <IconComponent className={`w-8 h-8 ${
                    isSelected ? 'text-white' : 'text-white/70'
                  }`} />
                </div>
                <div className="text-4xl mb-3">{group.emoji}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{group.name}</h3>
                <p className="text-white/80">{group.description}</p>
                {isSelected && (
                  <div className="mt-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {data.groupType && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">
              Viaggiando come: {getGroupTypeInfo(data.groupType)?.name}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.groupType}
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
