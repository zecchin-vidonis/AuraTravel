'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlanningData } from '@/app/plan/page'
import { MapPin, Calendar, DollarSign, Users, Heart, Sparkles, Loader2 } from 'lucide-react'

interface PlanningSummaryProps {
  data: PlanningData
  onStartOver: () => void
}

const SEASONS = [
  { id: 'spring', name: 'Primavera', emoji: '🌸' },
  { id: 'summer', name: 'Estate', emoji: '☀️' },
  { id: 'autumn', name: 'Autunno', emoji: '🍂' },
  { id: 'winter', name: 'Inverno', emoji: '❄️' },
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

const BUDGET_LEVELS = [
  { id: 'backpacker', name: 'Zaino in Spalla', emoji: '🎒', range: '$20-50/giorno' },
  { id: 'easygoing', name: 'Tranquillo', emoji: '☕', range: '$50-150/giorno' },
  { id: 'indulgent', name: 'Indulgente', emoji: '👑', range: '$150+/giorno' },
]

const GROUP_TYPES = [
  { id: 'solo', name: 'Solo', emoji: '🧳' },
  { id: 'friends', name: 'Amici', emoji: '👥' },
  { id: 'couple', name: 'Coppia', emoji: '💕' },
  { id: 'family', name: 'Famiglia', emoji: '👨‍👩‍👧‍👦' },
]

const AGE_RANGES = [
  { id: '18-25', name: '18-25', emoji: '🎓' },
  { id: '26-40', name: '26-40', emoji: '💼' },
  { id: '40-60', name: '40-60', emoji: '🏆' },
  { id: '60+', name: '60+', emoji: '🌅' },
  { id: 'mixed', name: 'Età miste', emoji: '🌈' },
]

const INTERESTS = [
  { id: 'culture', name: 'Cultura', emoji: '🏛️' },
  { id: 'food', name: 'Cibo', emoji: '🍽️' },
  { id: 'nature', name: 'Natura', emoji: '🌲' },
  { id: 'nightlife', name: 'Vita Notturna', emoji: '🎉' },
  { id: 'romance', name: 'Romanticismo', emoji: '💕' },
  { id: 'adventure', name: 'Avventura', emoji: '🏔️' },
]

export function PlanningSummary({ data, onStartOver }: PlanningSummaryProps) {
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false)
  const [itinerary, setItinerary] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const generateItinerary = async () => {
    setIsGeneratingItinerary(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planningData: data }),
      })

      if (!response.ok) {
        throw new Error('Impossibile generare l\'itinerario')
      }

      const result = await response.json()
      setItinerary(result.itinerary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore')
    } finally {
      setIsGeneratingItinerary(false)
    }
  }
  const getWhenDisplay = () => {
    const season = SEASONS.find(s => s.id === data.when)
    const month = MONTHS.find(m => m.id === data.when)
    return season ? `${season.emoji} ${season.name}` : month ? `${month.emoji} ${month.name}` : data.when
  }

  const getBudgetDisplay = () => {
    if (data.budget === 'custom') {
      return `💰 Custom: $${data.budgetAmount}/day`
    }
    const budget = BUDGET_LEVELS.find(b => b.id === data.budget)
    return budget ? `${budget.emoji} ${budget.name} (${budget.range})` : data.budget
  }

  const getGroupTypeDisplay = () => {
    const group = GROUP_TYPES.find(g => g.id === data.groupType)
    return group ? `${group.emoji} ${group.name}` : data.groupType
  }

  const getAgeRangeDisplay = () => {
    const ageRange = AGE_RANGES.find(a => a.id === data.groupAgeRange)
    return ageRange ? `${ageRange.emoji} ${ageRange.name}` : data.groupAgeRange
  }

  const getInterestsDisplay = () => {
    return data.interests?.map(interest => {
      const interestInfo = INTERESTS.find(i => i.id === interest)
      return interestInfo ? `${interestInfo.emoji} ${interestInfo.name}` : interest
    }) || []
  }

  // If itinerary is generated, show it
  if (itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Il Tuo Itinerario Personalizzato</h1>
            <p className="text-gray-600">Il tuo piano di viaggio generato dall'AI è pronto!</p>
          </div>

          {/* Itinerary Summary */}
          {itinerary.summary && (
            <Card className="p-6 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Riepilogo del Viaggio</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{itinerary.summary.totalDays}</div>
                  <div className="text-gray-600">Giorni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{itinerary.summary.estimatedTotalCost}</div>
                  <div className="text-gray-600">Costo Stimato</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{itinerary.summary.highlights?.length || 0}</div>
                  <div className="text-gray-600">Punti Salienti</div>
                </div>
              </div>
            </Card>
          )}

          {/* Daily Itinerary */}
          <div className="space-y-6">
            {itinerary.itinerary?.map((day: any, index: number) => (
              <Card key={index} className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Giorno {day.day}</h3>
                  <span className="text-sm text-gray-500">{day.date}</span>
                </div>
                
                <div className="space-y-4">
                  {day.activities?.map((activity: any, actIndex: number) => (
                    <div key={actIndex} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-indigo-600 min-w-[60px]">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                        {activity.location && (
                          <p className="text-gray-500 text-xs mt-1">📍 {activity.location}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          {activity.duration && <span>⏱️ {activity.duration}</span>}
                          {activity.cost && <span>💰 {activity.cost}</span>}
                          {activity.type && <span>🏷️ {activity.type}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {day.totalCost && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Totale Giornaliero:</span>
                      <span className="font-bold text-green-600">{day.totalCost}</span>
                    </div>
                  </div>
                )}

                {day.tips && day.tips.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-2">💡 Consigli per questo giorno:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {day.tips.map((tip: string, tipIndex: number) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Salva Itinerario
              </Button>
              <Button variant="outline" size="lg" onClick={onStartOver} className="px-8">
                Pianifica un Altro Viaggio
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Il Tuo Piano di Viaggio Perfetto</h1>
          <p className="text-gray-600">Ecco cosa abbiamo pianificato per la tua fantastica avventura!</p>
        </div>

        <Card className="p-8 shadow-lg">
          <div className="space-y-6">
            {/* Destination */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Destinazione</h3>
                <p className="text-gray-700">{data.destination}</p>
              </div>
            </div>

            {/* When & Duration */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Quando e Durata</h3>
                <p className="text-gray-700">{getWhenDisplay()} • {data.duration} days</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Stile di Budget</h3>
                <p className="text-gray-700">{getBudgetDisplay()}</p>
              </div>
            </div>

            {/* Group Type */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Gruppo di Viaggio</h3>
                <p className="text-gray-700">{getGroupTypeDisplay()}</p>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
              <Users className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Atmosfera del Gruppo</h3>
                <p className="text-gray-700">{getAgeRangeDisplay()}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg">
              <Heart className="w-6 h-6 text-indigo-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Interessi e Attività</h3>
                <div className="flex flex-wrap gap-2">
                  {getInterestsDisplay().map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pronto per iniziare a pianificare?</h3>
              <p className="text-gray-600 mb-6">
                Genera il tuo itinerario personalizzato con raccomandazioni basate sull'AI,
                alloggi e attività su misura per te.
              </p>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={generateItinerary}
                  disabled={isGeneratingItinerary}
                >
                  {isGeneratingItinerary ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generazione Itinerario...
                    </>
                  ) : (
                    'Genera il Mio Itinerario'
                  )}
                </Button>
                <Button variant="outline" size="lg" onClick={onStartOver} className="px-8">
                  Ricomincia
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
