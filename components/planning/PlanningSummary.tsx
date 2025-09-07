'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlanningData } from '@/app/plan/page'
import { MapPin, Calendar, DollarSign, Users, Heart, Sparkles } from 'lucide-react'

interface PlanningSummaryProps {
  data: PlanningData
  onStartOver: () => void
}

const SEASONS = [
  { id: 'spring', name: 'Spring', emoji: '🌸' },
  { id: 'summer', name: 'Summer', emoji: '☀️' },
  { id: 'autumn', name: 'Autumn', emoji: '🍂' },
  { id: 'winter', name: 'Winter', emoji: '❄️' },
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

const BUDGET_LEVELS = [
  { id: 'backpacker', name: 'Backpacker', emoji: '🎒', range: '$20-50/day' },
  { id: 'easygoing', name: 'Easygoing', emoji: '☕', range: '$50-150/day' },
  { id: 'indulgent', name: 'Indulgent', emoji: '👑', range: '$150+/day' },
]

const GROUP_TYPES = [
  { id: 'solo', name: 'Solo', emoji: '🧳' },
  { id: 'friends', name: 'Friends', emoji: '👥' },
  { id: 'couple', name: 'Couple', emoji: '💕' },
  { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
]

const AGE_RANGES = [
  { id: '18-25', name: '18-25', emoji: '🎓' },
  { id: '26-40', name: '26-40', emoji: '💼' },
  { id: '40-60', name: '40-60', emoji: '🏆' },
  { id: '60+', name: '60+', emoji: '🌅' },
  { id: 'mixed', name: 'Mixed ages', emoji: '🌈' },
]

const INTERESTS = [
  { id: 'culture', name: 'Culture', emoji: '🏛️' },
  { id: 'food', name: 'Food', emoji: '🍽️' },
  { id: 'nature', name: 'Nature', emoji: '🌲' },
  { id: 'nightlife', name: 'Nightlife', emoji: '🎉' },
  { id: 'romance', name: 'Romance', emoji: '💕' },
  { id: 'adventure', name: 'Adventure', emoji: '🏔️' },
]

export function PlanningSummary({ data, onStartOver }: PlanningSummaryProps) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Trip Plan</h1>
          <p className="text-gray-600">Here's what we've planned for your amazing adventure!</p>
        </div>

        <Card className="p-8 shadow-lg">
          <div className="space-y-6">
            {/* Destination */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Destination</h3>
                <p className="text-gray-700">{data.destination}</p>
              </div>
            </div>

            {/* When & Duration */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">When & Duration</h3>
                <p className="text-gray-700">{getWhenDisplay()} • {data.duration} days</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Budget Style</h3>
                <p className="text-gray-700">{getBudgetDisplay()}</p>
              </div>
            </div>

            {/* Group Type */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Travel Group</h3>
                <p className="text-gray-700">{getGroupTypeDisplay()}</p>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
              <Users className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Group Vibe</h3>
                <p className="text-gray-700">{getAgeRangeDisplay()}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg">
              <Heart className="w-6 h-6 text-indigo-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Interests & Activities</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to start planning?</h3>
              <p className="text-gray-600 mb-6">
                We're working on creating your personalized itinerary with recommendations, 
                accommodations, and activities tailored just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  View My Itinerary
                </Button>
                <Button variant="outline" size="lg" onClick={onStartOver} className="px-8">
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
