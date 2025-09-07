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
    description: 'Just me, myself, and I',
    emoji: '🧳',
    color: 'blue'
  },
  {
    id: 'friends',
    name: 'Friends',
    icon: Users,
    description: 'Adventure with my crew',
    emoji: '👥',
    color: 'green'
  },
  {
    id: 'couple',
    name: 'Couple',
    icon: Heart,
    description: 'Romantic getaway for two',
    emoji: '💕',
    color: 'pink'
  },
  {
    id: 'family',
    name: 'Family',
    icon: Baby,
    description: 'Fun for the whole family',
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
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Who's joining you?</h2>
        <p className="text-gray-600">Tell us about your travel companions</p>
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
                  ? `border-${group.color}-500 bg-${group.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isSelected ? `bg-${group.color}-100` : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-8 h-8 ${
                    isSelected ? `text-${group.color}-600` : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-4xl mb-3">{group.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600">{group.description}</p>
                {isSelected && (
                  <div className="mt-4 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mx-auto">
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
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">
              Traveling as: {getGroupTypeInfo(data.groupType)?.name}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.groupType}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
