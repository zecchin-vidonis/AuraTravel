'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { PlanningData } from '@/app/plan/page'
import { MapPin, Sparkles } from 'lucide-react'

interface StepDestinationProps {
  data: PlanningData
  onUpdate: (updates: Partial<PlanningData>) => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const POPULAR_DESTINATIONS = [
  { name: 'Tokyo, Japan', flag: '🇯🇵', landmark: '🗼' },
  { name: 'Paris, France', flag: '🇫🇷', landmark: '🗼' },
  { name: 'New York, USA', flag: '🇺🇸', landmark: '🗽' },
  { name: 'London, UK', flag: '🇬🇧', landmark: '🏰' },
  { name: 'Rome, Italy', flag: '🇮🇹', landmark: '🏛️' },
  { name: 'Barcelona, Spain', flag: '🇪🇸', landmark: '🏛️' },
  { name: 'Sydney, Australia', flag: '🇦🇺', landmark: '🏛️' },
  { name: 'Bangkok, Thailand', flag: '🇹🇭', landmark: '🏛️' },
  { name: 'Dubai, UAE', flag: '🇦🇪', landmark: '🏙️' },
  { name: 'Amsterdam, Netherlands', flag: '🇳🇱', landmark: '🌷' },
]

export function StepDestination({ data, onUpdate, onNext }: StepDestinationProps) {
  const [searchQuery, setSearchQuery] = useState(data.destination)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleDestinationSelect = (destination: string) => {
    setSearchQuery(destination)
    onUpdate({ destination })
    setShowSuggestions(false)
  }

  const handleSurpriseMe = () => {
    const randomDestination = POPULAR_DESTINATIONS[Math.floor(Math.random() * POPULAR_DESTINATIONS.length)]
    handleDestinationSelect(randomDestination.name)
  }

  const filteredDestinations = POPULAR_DESTINATIONS.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where are we off to?</h2>
        <p className="text-gray-600">Tell us your dream destination or let us surprise you</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a destination..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onUpdate({ destination: e.target.value })
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="text-lg py-3 pl-4 pr-12"
          />
          <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {showSuggestions && searchQuery && filteredDestinations.length > 0 && (
          <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
            {filteredDestinations.map((dest, index) => (
              <button
                key={index}
                onClick={() => handleDestinationSelect(dest.name)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-2xl">{dest.flag}</span>
                <span className="text-2xl">{dest.landmark}</span>
                <span className="text-gray-900 font-medium">{dest.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="text-center">
          <span className="text-gray-500 text-sm">or</span>
        </div>

        <Button
          variant="outline"
          onClick={handleSurpriseMe}
          className="w-full py-3 text-lg flex items-center justify-center gap-2 border-dashed border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50"
        >
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Not sure? Surprise me!
        </Button>
      </div>

      {data.destination && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">Selected: {data.destination}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.destination}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
