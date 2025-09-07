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
  { id: 'spring', name: 'Primavera', emoji: '🌸', months: 'Mar - Mag' },
  { id: 'summer', name: 'Estate', emoji: '☀️', months: 'Giu - Ago' },
  { id: 'autumn', name: 'Autunno', emoji: '🍂', months: 'Set - Nov' },
  { id: 'winter', name: 'Inverno', emoji: '❄️', months: 'Dic - Feb' },
]

const MONTHS = [
  { id: 'january', name: 'Gennaio', emoji: '❄️' },
  { id: 'february', name: 'Febbraio', emoji: '💝' },
  { id: 'march', name: 'Marzo', emoji: '🌸' },
  { id: 'april', name: 'Aprile', emoji: '🌷' },
  { id: 'may', name: 'Maggio', emoji: '🌺' },
  { id: 'june', name: 'Giugno', emoji: '☀️' },
  { id: 'july', name: 'Luglio', emoji: '🏖️' },
  { id: 'august', name: 'Agosto', emoji: '🌻' },
  { id: 'september', name: 'Settembre', emoji: '🍂' },
  { id: 'october', name: 'Ottobre', emoji: '🎃' },
  { id: 'november', name: 'Novembre', emoji: '🦃' },
  { id: 'december', name: 'Dicembre', emoji: '🎄' },
]

const DURATION_OPTIONS = [
  { days: 2, label: 'Weekend' },
  { days: 3, label: '3 giorni' },
  { days: 5, label: '5 giorni' },
  { days: 7, label: '1 settimana' },
  { days: 10, label: '10 giorni' },
  { days: 14, label: '2 settimane' },
  { days: 21, label: '3 settimane' },
  { days: 30, label: '1 mese' },
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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Quando parti e per quanti giorni?</h2>
        <p className="text-white/80 font-medium">Scegli la stagione di viaggio e la durata del tuo viaggio</p>
      </div>

      {/* When Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-white" />
          Quando viaggi?
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {SEASONS.map((season) => (
            <button
              key={season.id}
              onClick={() => handleWhenSelect(season.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.when === season.id
                  ? 'border-blue-500 bg-blue-500/20 backdrop-blur-sm'
                  : 'border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{season.emoji}</div>
                <div className="font-medium text-white">{season.name}</div>
                <div className="text-sm text-white/70">{season.months}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowMonths(!showMonths)}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm"
          >
            {showMonths ? 'Nascondi mesi specifici' : 'Scegli un mese specifico'}
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
                    ? 'border-blue-500 bg-blue-500/20 backdrop-blur-sm'
                    : 'border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">{month.emoji}</div>
                  <div className="text-sm font-medium text-white">{month.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Duration Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-white" />
          Quanto dura il tuo viaggio?
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.days}
              onClick={() => handleDurationSelect(option.days)}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.duration === option.days
                  ? 'border-blue-500 bg-blue-500/20 backdrop-blur-sm'
                  : 'border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{option.days}</div>
                <div className="text-sm text-white/70">{option.label}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Duration */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
          <label className="block text-sm font-medium text-white mb-2">
            Oppure inserisci una durata personalizzata (2-30 giorni):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2"
              max="30"
              value={data.duration}
              onChange={(e) => handleDurationSelect(parseInt(e.target.value) || 2)}
              className="flex-1 px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder:text-white/60"
            />
            <span className="text-white/80">giorni</span>
          </div>
        </div>
      </div>

      {data.when && data.duration && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">
              {data.duration} giorni in {SEASONS.find(s => s.id === data.when)?.name || MONTHS.find(m => m.id === data.when)?.name}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!data.when || !data.duration}
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Continua
        </Button>
      </div>
    </div>
  )
}
