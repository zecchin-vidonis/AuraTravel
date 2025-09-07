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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Dove andiamo?</h2>
        <p className="text-white/80 font-medium">Dicci la tua destinazione dei sogni o lascia che ti sorprendiamo</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cerca una destinazione..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onUpdate({ destination: e.target.value })
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="text-lg py-3 pl-4 pr-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        </div>

        {showSuggestions && searchQuery && filteredDestinations.length > 0 && (
          <div className="border border-white/20 rounded-lg bg-white/10 backdrop-blur-md shadow-lg max-h-60 overflow-y-auto">
            {filteredDestinations.map((dest, index) => (
              <button
                key={index}
                onClick={() => handleDestinationSelect(dest.name)}
                className="w-full px-4 py-3 text-left hover:bg-white/20 flex items-center gap-3 border-b border-white/10 last:border-b-0 transition-colors duration-200"
              >
                <span className="text-2xl">{dest.flag}</span>
                <span className="text-2xl">{dest.landmark}</span>
                <span className="text-white font-medium">{dest.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="text-center">
          <span className="text-white/60 text-sm font-medium">oppure</span>
        </div>

        <Button
          variant="outline"
          onClick={handleSurpriseMe}
          className="w-full py-3 text-lg flex items-center justify-center gap-2 border-dashed border-2 border-white/30 hover:border-white/50 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white"
        >
          <Sparkles className="w-5 h-5 text-white" />
          Non sei sicuro? Sorprendimi!
        </Button>
      </div>

      {data.destination && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Selezionato: {data.destination}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.destination}
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
