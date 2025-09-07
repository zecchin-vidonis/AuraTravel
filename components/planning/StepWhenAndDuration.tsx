'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlanningData } from '@/app/plan/page'
import { Calendar, Clock } from 'lucide-react'

interface StepWhenAndDurationProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const SEASONS = [
  { id: 'spring', name: 'Spring', emoji: '🌸', months: 'Mar - May' },
  { id: 'summer', name: 'Summer', emoji: '☀️', months: 'Jun - Aug' },
  { id: 'autumn', name: 'Autumn', emoji: '🍂', months: 'Sep - Nov' },
  { id: 'winter', name: 'Winter', emoji: '❄️', months: 'Dec - Feb' },
]

const MONTHS = [
  { id: 'january', name: 'January', emoji: '❄️' },
  { id: 'february', name: 'February', emoji: '💝' },
  { id: 'march', name: 'March', emoji: '🌸' },
  { id: 'april', name: 'April', emoji: '🌷' },
  { id: 'may', name: 'May', emoji: '🌺' },
  { id: 'june', name: 'June', emoji: '☀️' },
  { id: 'july', name: 'July', emoji: '🏖️' },
  { id: 'august', name: 'August', emoji: '🌻' },
  { id: 'september', name: 'September', emoji: '🍂' },
  { id: 'october', name: 'October', emoji: '🎃' },
  { id: 'november', name: 'November', emoji: '🦃' },
  { id: 'december', name: 'December', emoji: '🎄' },
]

const DURATION_OPTIONS = [
  { days: 2, label: 'Weekend' },
  { days: 3, label: '3 days' },
  { days: 5, label: '5 days' },
  { days: 7, label: '1 week' },
  { days: 10, label: '10 days' },
  { days: 14, label: '2 weeks' },
  { days: 21, label: '3 weeks' },
  { days: 30, label: '1 month' },
]

export function StepWhenAndDuration({ data, onUpdate, onNext }: StepWhenAndDurationProps) {
  const [showMonths, setShowMonths] = useState(false)

  const handleWhenSelect = (when: string) => {
    onUpdate({ when })
  }

  const handleDurationSelect = (duration: number) => {
    onUpdate({ duration })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">When are you going, and for how many days?</h2>
        <p className="text-gray-600">Choose your travel season and trip duration</p>
      </div>

      {/* When Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          When are you traveling?
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {SEASONS.map((season) => (
            <button
              key={season.id}
              onClick={() => handleWhenSelect(season.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.when === season.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{season.emoji}</div>
                <div className="font-medium text-gray-900">{season.name}</div>
                <div className="text-sm text-gray-500">{season.months}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowMonths(!showMonths)}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            {showMonths ? 'Hide specific months' : 'Choose a specific month'}
          </button>
        </div>

        {showMonths && (
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month) => (
              <button
                key={month.id}
                onClick={() => handleWhenSelect(month.id)}
                className={`p-3 rounded-lg border transition-all ${
                  data.when === month.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">{month.emoji}</div>
                  <div className="text-sm font-medium text-gray-900">{month.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Duration Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          How long is your trip?
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.days}
              onClick={() => handleDurationSelect(option.days)}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.duration === option.days
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{option.days}</div>
                <div className="text-sm text-gray-600">{option.label}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Duration */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter custom duration (2-30 days):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2"
              max="30"
              value={data.duration}
              onChange={(e) => handleDurationSelect(parseInt(e.target.value) || 2)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-gray-600">days</span>
          </div>
        </div>
      </div>

      {data.when && data.duration && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">
              {data.duration} days in {SEASONS.find(s => s.id === data.when)?.name || MONTHS.find(m => m.id === data.when)?.name}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.when || !data.duration}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
