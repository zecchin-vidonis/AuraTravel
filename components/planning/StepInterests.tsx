'use client'

import { Button } from '@/components/ui/button'
import { PlanningData } from '@/app/plan/page'
import { Heart } from 'lucide-react'

interface StepInterestsProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const INTERESTS = [
  {
    id: 'culture',
    name: 'Cultura',
    description: 'Musei, storia, tradizioni locali',
    emoji: '🏛️',
    color: 'blue'
  },
  {
    id: 'food',
    name: 'Cibo',
    description: 'Cucina locale, corsi di cucina, tour gastronomici',
    emoji: '🍽️',
    color: 'orange'
  },
  {
    id: 'nature',
    name: 'Natura',
    description: 'Escursionismo, fauna selvatica, parchi nazionali',
    emoji: '🌲',
    color: 'green'
  },
  {
    id: 'nightlife',
    name: 'Vita Notturna',
    description: 'Bar, club, musica dal vivo, intrattenimento',
    emoji: '🎉',
    color: 'purple'
  },
  {
    id: 'romance',
    name: 'Romanticismo',
    description: 'Cene intime, viste panoramiche, attività per coppie',
    emoji: '💕',
    color: 'pink'
  },
  {
    id: 'adventure',
    name: 'Avventura',
    description: "Sport estremi, attività all'aperto, ricerca di emozioni",
    emoji: '🏔️',
    color: 'red'
  }
]

export function StepInterests({ data, onUpdate, onNext }: StepInterestsProps) {
  const handleInterestToggle = (interest: string) => {
    const currentInterests = data.interests || []
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    onUpdate({ interests: updatedInterests })
  }

  const getInterestInfo = (interestId: string) => {
    return INTERESTS.find(i => i.id === interestId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Di cosa dovrebbe trattare il tuo viaggio?</h2>
        <p className="text-gray-600">Seleziona tutte le esperienze che ti entusiasmano (puoi scegliere più opzioni!)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INTERESTS.map((interest) => {
          const isSelected = data.interests?.includes(interest.id) || false
          
          return (
            <button
              key={interest.id}
              onClick={() => handleInterestToggle(interest.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? `border-${interest.color}-500 bg-${interest.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? `bg-${interest.color}-100` : 'bg-gray-100'
                }`}>
                  <span className="text-2xl">{interest.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{interest.name}</h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{interest.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {data.interests && data.interests.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">Interessi selezionati:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                <span>{getInterestInfo(interest)?.emoji}</span>
                {getInterestInfo(interest)?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.interests || data.interests.length === 0}
          size="lg"
          className="px-8"
        >
          Crea il Mio Piano
        </Button>
      </div>
    </div>
  )
}
