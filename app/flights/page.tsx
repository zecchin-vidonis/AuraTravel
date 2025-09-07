'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, MapPin, Calendar, Users, Search, Loader2, Info } from 'lucide-react'

interface FlightSearchData {
  origin: string
  destination: string
  departureDate: string
  returnDate: string
  adults: number
  children: number
  infants: number
  travelClass: string
}

interface FlightOffer {
  id: string
  price: string
  currency: string
  departure: {
    airport: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    time: string
    date: string
  }
  duration: string
  airline: string
  flightNumber: string
  stops: number
}

// Common airport codes for reference
const commonAirports = [
  { code: 'FCO', name: 'Roma Fiumicino', country: 'Italia' },
  { code: 'MXP', name: 'Milano Malpensa', country: 'Italia' },
  { code: 'LIN', name: 'Milano Linate', country: 'Italia' },
  { code: 'JFK', name: 'New York Kennedy', country: 'USA' },
  { code: 'LHR', name: 'Londra Heathrow', country: 'Regno Unito' },
  { code: 'CDG', name: 'Parigi Charles de Gaulle', country: 'Francia' },
  { code: 'MAD', name: 'Madrid Barajas', country: 'Spagna' },
  { code: 'BCN', name: 'Barcellona El Prat', country: 'Spagna' },
  { code: 'AMS', name: 'Amsterdam Schiphol', country: 'Paesi Bassi' },
  { code: 'FRA', name: 'Francoforte', country: 'Germania' },
  { code: 'MUC', name: 'Monaco di Baviera', country: 'Germania' },
  { code: 'ZUR', name: 'Zurigo', country: 'Svizzera' },
  { code: 'VIE', name: 'Vienna', country: 'Austria' },
  { code: 'CPH', name: 'Copenaghen', country: 'Danimarca' },
  { code: 'ARN', name: 'Stoccolma Arlanda', country: 'Svezia' },
  { code: 'OSL', name: 'Oslo Gardermoen', country: 'Norvegia' },
  { code: 'HEL', name: 'Helsinki', country: 'Finlandia' },
  { code: 'IST', name: 'Istanbul', country: 'Turchia' },
  { code: 'DXB', name: 'Dubai', country: 'Emirati Arabi' },
  { code: 'DOH', name: 'Doha', country: 'Qatar' }
]

export default function FlightsPage() {
  const [searchData, setSearchData] = useState<FlightSearchData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'ECONOMY'
  })

  const [isSearching, setIsSearching] = useState(false)
  const [flights, setFlights] = useState<FlightOffer[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FlightSearchData, value: string | number) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const searchFlights = async () => {
    setIsSearching(true)
    setError(null)
    setFlights([])

    try {
      const response = await fetch('/api/search-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Errore nella ricerca voli')
      }

      const data = await response.json()
      console.log(data)
      setFlights(data.flights || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore')
    } finally {
      setIsSearching(false)
    }
  }

  const isSearchValid = searchData.origin && searchData.destination && searchData.departureDate

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Cerca Voli
            </h1>
          </div>
          <p className="text-white/80 text-lg font-medium max-w-2xl mx-auto">
            Trova i migliori voli per la tua destinazione con prezzi competitivi e opzioni flessibili
          </p>
        </div>

        {/* API Configuration Notice */}
        <Card className="mb-6 bg-blue-500/20 border border-blue-500/30 shadow-2xl">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-blue-300 font-semibold mb-1">Configurazione API Obbligatoria</h3>
                <p className="text-blue-200 text-sm">
                  Per utilizzare la ricerca voli, configura le credenziali API di Amadeus nel file <code className="bg-blue-600/30 px-1 rounded">.env.local</code>. 
                  <a href="/AMADEUS_SETUP.md" className="underline ml-1 hover:text-blue-100">Guida completa</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Airport Codes Reference */}
        <Card className="mb-6 bg-green-500/20 border border-green-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-green-300 font-semibold">Codici Aeroporto Comuni</CardTitle>
            <CardDescription className="text-green-200">
              Usa questi codici di 3 lettere per la ricerca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonAirports.map((airport) => (
                <div key={airport.code} className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                  <div className="font-mono text-green-300 font-bold text-lg">{airport.code}</div>
                  <div className="text-green-200 text-sm">{airport.name}</div>
                  <div className="text-green-300/70 text-xs">{airport.country}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Form */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Cerca il tuo volo ideale</CardTitle>
            <CardDescription className="text-white/80">
              Inserisci i dettagli del tuo viaggio per trovare le migliori offerte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin */}
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-white font-medium">Partenza</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="origin"
                    type="text"
                    placeholder="Codice aeroporto (es. FCO)"
                    value={searchData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value.toUpperCase().slice(0, 3))}
                    maxLength={3}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20 font-mono"
                  />
                </div>
                {searchData.origin && searchData.origin.length !== 3 && (
                  <p className="text-yellow-400 text-sm">⚠️ Il codice deve essere di esattamente 3 lettere</p>
                )}
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-white font-medium">Destinazione</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="destination"
                    type="text"
                    placeholder="Codice aeroporto (es. JFK)"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value.toUpperCase().slice(0, 3))}
                    maxLength={3}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20 font-mono"
                  />
                </div>
                {searchData.destination && searchData.destination.length !== 3 && (
                  <p className="text-yellow-400 text-sm">⚠️ Il codice deve essere di esattamente 3 lettere</p>
                )}
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label htmlFor="departureDate" className="text-white font-medium">Data Partenza</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="departureDate"
                    type="date"
                    value={searchData.departureDate}
                    onChange={(e) => handleInputChange('departureDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 bg-white/10 border-white/30 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <Label htmlFor="returnDate" className="text-white font-medium">Data Ritorno (opzionale)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="returnDate"
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    min={searchData.departureDate || new Date().toISOString().split('T')[0]}
                    className="pl-10 bg-white/10 border-white/30 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Passengers and Class */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="adults" className="text-white font-medium">Adulti</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    max="9"
                    value={searchData.adults}
                    onChange={(e) => handleInputChange('adults', parseInt(e.target.value) || 1)}
                    className="pl-10 bg-white/10 border-white/30 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="children" className="text-white font-medium">Bambini (2-11 anni)</Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  max="9"
                  value={searchData.children}
                  onChange={(e) => handleInputChange('children', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/30 text-white focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelClass" className="text-white font-medium">Classe</Label>
                <select
                  id="travelClass"
                  value={searchData.travelClass}
                  onChange={(e) => handleInputChange('travelClass', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:border-blue-500 focus:ring-blue-500/20"
                >
                  <option value="ECONOMY" className="bg-slate-800">Economy</option>
                  <option value="PREMIUM_ECONOMY" className="bg-slate-800">Premium Economy</option>
                  <option value="BUSINESS" className="bg-slate-800">Business</option>
                  <option value="FIRST" className="bg-slate-800">First</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={searchFlights}
                disabled={!isSearchValid || isSearching}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Ricerca in corso...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Cerca Voli
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 bg-red-500/20 border border-red-500/30 shadow-2xl">
            <CardContent className="pt-6">
              <p className="text-red-300 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Voli Trovati ({flights.length})
            </h2>
            {flights.map((flight) => (
              <Card key={flight.id} className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-2xl font-bold text-blue-400">{flight.price}</div>
                        <div className="text-white/80">{flight.currency}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-white/60">Partenza</div>
                          <div className="text-white font-medium">{flight.departure.airport}</div>
                          <div className="text-white/80">{flight.departure.time}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/60">Durata</div>
                          <div className="text-white font-medium">{flight.duration}</div>
                          <div className="text-white/80">{flight.stops === 0 ? 'Volo diretto' : `${flight.stops} scalo/i`}</div>
                        </div>
                        <div>
                          <div className="text-white/60">Arrivo</div>
                          <div className="text-white font-medium">{flight.arrival.airport}</div>
                          <div className="text-white/80">{flight.arrival.time}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-white/80 text-sm">{flight.airline}</div>
                      <div className="text-white/60 text-xs">{flight.flightNumber}</div>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                        Seleziona
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}