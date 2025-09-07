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

  // Show loading state while generating itinerary
  if (isGeneratingItinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative text-center z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-white/20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Stiamo creando il tuo itinerario...
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            L'AI sta analizzando le tue preferenze e generando un piano di viaggio personalizzato
          </p>
          
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  // If itinerary is generated, show it
  if (itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent mb-2">Il Tuo Itinerario Personalizzato</h1>
            <p className="text-white/80 font-medium">Il tuo piano di viaggio generato dall'AI è pronto!</p>
          </div>

          {/* Itinerary Summary */}
          {itinerary.summary && (
            <Card className="p-6 mb-8 shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Riepilogo del Viaggio</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{itinerary.summary.totalDays}</div>
                  <div className="text-white/80 font-medium">Giorni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{itinerary.summary.estimatedTotalCost}</div>
                  <div className="text-white/80 font-medium">Costo Stimato</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{itinerary.summary.highlights?.length || 0}</div>
                  <div className="text-white/80 font-medium">Punti Salienti</div>
                </div>
              </div>
            </Card>
          )}

          {/* Daily Itinerary */}
          <div className="space-y-6">
            {itinerary.itinerary?.map((day: any, index: number) => (
              <Card key={index} className="p-6 shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Giorno {day.day}</h3>
                  <span className="text-sm text-white/70 font-medium">{day.date}</span>
                </div>
                
                <div className="space-y-4">
                  {day.activities?.map((activity: any, actIndex: number) => (
                    <div key={actIndex} className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                      <div className="text-sm font-semibold text-blue-400 min-w-[60px]">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{activity.title}</h4>
                        <p className="text-white/80 text-sm mt-1">{activity.description}</p>
                        {activity.location && (
                          <p className="text-white/70 text-xs mt-1">📍 {activity.location}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-xs text-white/70">
                          {activity.duration && <span>⏱️ {activity.duration}</span>}
                          {activity.cost && <span>💰 {activity.cost}</span>}
                          {activity.type && <span>🏷️ {activity.type}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {day.totalCost && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Totale Giornaliero:</span>
                      <span className="font-bold text-green-400">{day.totalCost}</span>
                    </div>
                  </div>
                )}

                {day.tips && day.tips.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <h5 className="font-semibold text-white mb-2">💡 Consigli per questo giorno:</h5>
                    <ul className="text-sm text-white/80 space-y-1">
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
              <Button size="lg" className="px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                Salva Itinerario
              </Button>
              <Button variant="outline" size="lg" onClick={onStartOver} className="px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                Pianifica un Altro Viaggio
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">Il Tuo Piano di Viaggio Perfetto</h1>
          <p className="text-white/80 font-medium">Ecco cosa abbiamo pianificato per la tua fantastica avventura!</p>
        </div>

        <Card className="p-8 shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
          <div className="space-y-6">
            {/* Destination */}
            <div className="flex items-center gap-4 p-4 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
              <MapPin className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">Destinazione</h3>
                <p className="text-white/80">{data.destination}</p>
              </div>
            </div>

            {/* When & Duration */}
            <div className="flex items-center gap-4 p-4 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30">
              <Calendar className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold text-white">Quando e Durata</h3>
                <p className="text-white/80">{getWhenDisplay()} • {data.duration} days</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-4 p-4 bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-500/30">
              <DollarSign className="w-6 h-6 text-orange-400" />
              <div>
                <h3 className="font-semibold text-white">Stile di Budget</h3>
                <p className="text-white/80">{getBudgetDisplay()}</p>
              </div>
            </div>

            {/* Group Type */}
            <div className="flex items-center gap-4 p-4 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30">
              <Users className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">Gruppo di Viaggio</h3>
                <p className="text-white/80">{getGroupTypeDisplay()}</p>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex items-center gap-4 p-4 bg-pink-500/20 backdrop-blur-sm rounded-lg border border-pink-500/30">
              <Users className="w-6 h-6 text-pink-400" />
              <div>
                <h3 className="font-semibold text-white">Atmosfera del Gruppo</h3>
                <p className="text-white/80">{getAgeRangeDisplay()}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="flex items-start gap-4 p-4 bg-indigo-500/20 backdrop-blur-sm rounded-lg border border-indigo-500/30">
              <Heart className="w-6 h-6 text-indigo-400 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Interessi e Attività</h3>
                <div className="flex flex-wrap gap-2">
                  {getInterestsDisplay().map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Pronto per iniziare a pianificare?</h3>
              <p className="text-white/80 mb-6 font-medium">
                Genera il tuo itinerario personalizzato con raccomandazioni basate sull'AI,
                alloggi e attività su misura per te.
              </p>
              
              {error && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
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
                <Button variant="outline" size="lg" onClick={onStartOver} className="px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
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
